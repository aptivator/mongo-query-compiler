import {getId, isPlainObject, isUnwindableOperand, makePath} from './_lib/utils';
import {operatorTypes}                                       from './_lib/vars';
import {evaluate}                                            from './evaluator/evaluator';
import {LogicBlock}                                          from './logic-block/logic-block';

export function compileMongoQuery(query) {
  let symbolTable = {};
  let params = {operand: query, symbolTable, logicBlock: new LogicBlock};
  let logicBlock = expression(params);
  let code = 'return ' + logicBlock.return();
  let filterer = new Function('o', 'symbolTable', 'evaluate', code);

  return function(o) {
    return filterer(o, symbolTable, evaluate);  
  }
}

function elemental(options, parentOptions) {
  let {operator, operand} = options;

  if(isUnwindableOperand(operator, operand)) {
    let {path} = options;

    return Object.entries(operand).forEach(([subPath, operand]) => {
      subPath = makePath(path, subPath);
      let _options = Object.assign({}, options, {path: subPath, operand});
      elemental(_options, parentOptions);
    });
  }

  preprocessElementalOperands(options, parentOptions);
  addStatement(options);
}

function preprocessElementalOperands(options, parentOptions) {
  let {operator, operand} = options;

  if('$regexp'.startsWith(operator) && typeof operand === 'string') {
    return options.operand = new RegExp(operand, parentOptions.operand.$options);
  }
}

function addStatement(options) {
  let {logicBlock, flatten, symbolTable} = options;
  let {operand, operator, path = '__self'} = options;
  let symbolName = getId();
  let statement = `evaluate(o, '${path}', ${flatten}, '${operator}', symbolTable, '${symbolName}')`;
  
  symbolTable[symbolName] = operand;
  logicBlock.add(statement);
}

function expression(options) {
  let {operand} = options;
  
  if(operand.hasOwnProperty('$flatten')) {
    options.flatten = !!operand.$flatten;
    delete operand.$flatten;
  }
  
  Object.entries(operand).forEach(([operator, operand]) => {
    if(operatorTypes.ignoreds.has(operator)) {
      return;
    }
    
    let _options = Object.assign({}, options, {operator, operand});
    
    if(operatorTypes.elementals.has(operator)) {
      return elemental(_options, options);
    }
    
    if(operatorTypes.logicals.has(operator)) {
      return logical(_options);
    }
    
    _options.path = makePath(_options.path, operator);
    
    if(isPlainObject(operand)) {
      return expression(_options);
    }
    
    _options.operator = '$eq';
    elemental(_options);
  });
  
  return options.logicBlock;
}

function logical(options) {
  let {operator, operand} = options;
  
  if(operator === '$not' && !isPlainObject(operand)) {
    options.operator = '$ne';
    return elemental(options);
  }
  
  options.logicBlock = options.logicBlock.group(operator);
  
  if(Array.isArray(operand)) {
    return operand.forEach(operand => {
      let _options = Object.assign({}, options, {operand});
      expression(_options);
    });
  }
  
  expression(options);
}
