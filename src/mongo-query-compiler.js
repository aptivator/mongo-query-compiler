import {utils}         from './_lib/utils';
import {operatorTypes} from './_lib/vars';
import {evaluate}      from './evaluator/evaluator';
import {LogicBlock}    from './logic-block/logic-block';

export function compileMongoQuery(query) {
  let symbolTable = {};
  let logicBlock = new LogicBlock();
  let code = expression({operand: query, symbolTable, logicBlock}, true);
  let filterer = new Function('o', 'symbolTable', 'evaluate', code);

  return function(o) {
    return filterer(o, symbolTable, evaluate);  
  }
}

function elemental(options) {
  let {operator, operand} = options;

  if(utils.unwindOperand(operator, operand)) {
    let {path} = options;

    return Object.entries(operand).forEach(([_path, operand]) => {
      _path = utils.makePath(path, _path);
      let _options = Object.assign({}, options, {path: _path, operand});
      elemental(_options);
    });
  }

  preprocessElementalOperands(options);
  addStatement(options);
}

function preprocessElementalOperands(options) {
  let {operator, operand} = options;

  if(operator === '$regexp' && typeof operand === 'string') {
    return options.operand = new RegExp(operand);
  }
}

function addStatement(options) {
  let {logicBlock, flatten, symbolTable} = options;
  let {operand, operator, path = '__self'} = options;
  let symbolName = utils.uniqueId();
  let statement = `evaluate(o, '${path}', ${flatten}, '${operator}', symbolTable, '${symbolName}')`;
  
  symbolTable[symbolName] = operand;
  logicBlock.add(statement);
}

function expression(options, start = false) {
  let {operand} = options;
  
  if(operand.hasOwnProperty('$flatten')) {
    options.flatten = !!operand.$flatten;
    delete operand.$flatten;
  }
  
  Object.entries(operand).forEach(([operator, operand]) => {
    if(operatorTypes.ignoreds.includes(operator)) {
      return;
    }
    
    let _options = Object.assign({}, options, {operator, operand});
    
    if(operatorTypes.elementals.includes(operator)) {
      return elemental(_options);
    }
    
    if(operatorTypes.logicals.includes(operator)) {
      return logical(_options);
    }
    
    _options.path = utils.makePath(_options.path, operator);
    
    if(utils.isPlainObject(operand)) {
      return expression(_options);
    }
    
    _options.operator = '$eq';
    elemental(_options);
  });
  
  if(start) {
    return options.logicBlock.return(true) + 'return true;';
  }
}

function logical(options) {
  let {operator, operand} = options;
  
  if(operator === '$not' && !utils.isPlainObject(operand)) {
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
