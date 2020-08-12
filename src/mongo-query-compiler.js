import _               from 'lodash';
import {utils}         from './_lib/utils';
import {operatorTypes} from './_lib/vars';
import {evaluate}      from './evaluator/evaluator';
import {LogicBlock}    from './logic-block/logic-block';

export function compileMongoQuery(query) {
  let symbolTable = {};
  let logicBlock = new LogicBlock();
  let code = expression({operand: query, symbolTable, logicBlock}, true);
  let filterer = new Function('o', 'symbolTable', 'evaluate', code);
  return _.partial(filterer, _, symbolTable, evaluate);
}

function elemental(options) {
  let {operator, operand, path} = options;
  
  if(utils.unwindOperand(operator, operand)) {
    return Object.entries(operand).forEach(([_path, operand]) => {
      _path = utils.makePath(path, _path);
      let _options = Object.assign({}, options, {path: _path, operand});
      elemental(_options);
    });
  }
  
  if(!path) {
    path = '__self';
  }
  
  let {logicBlock, flatten, symbolTable} = options;
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
    
    if(_.isPlainObject(operand)) {
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
  
  if(operator === '$not' && !_.isPlainObject(operand)) {
    options.operator = '$ne';
    return elemental(options);
  }
  
  options.logicBlock = options.logicBlock.group(operator);
  
  if(_.isArray(operand)) {
    return operand.forEach(operand => {
      let _options = Object.assign({}, options, {operand});
      expression(_options);
    });
  }
  
  expression(options);
}
