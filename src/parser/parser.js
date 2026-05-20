import {isPlainObject}                        from '../_lib/utils';
import {getId, isUnwindableOperand, makePath} from './_lib/utils';
import {operatorTypes}                        from './_lib/vars';

export function expression(options) {
  let {operand} = options;
  
  if(operand.hasOwnProperty('$flatten')) {
    options.flatten = !!operand.$flatten;
    delete operand.$flatten;
  }
  
  Object.entries(operand).forEach(([operator, operand]) => {
    if(!operatorTypes.ignoreds.has(operator)) {
      let childOptions = Object.assign({}, options, {operator, operand});
    
      if(operatorTypes.elementals.has(operator)) {
        return elemental(childOptions, options);
      }
      
      if(operatorTypes.logicals.has(operator)) {
        return logical(childOptions);
      }
      
      childOptions.path = makePath(childOptions.path, operator);
      
      if(isPlainObject(operand)) {
        return expression(childOptions);
      }
      
      childOptions.operator = '$eq';
      elemental(childOptions);
    }
  });
  
  return options.logicBlock;
}

function elemental(options, parentOptions) {
  let {operator, operand} = options;

  if(isUnwindableOperand(operator, operand)) {
    let {path} = options;

    return Object.entries(operand).forEach(([subPath, operand]) => {
      subPath = makePath(path, subPath);
      let childOptions = Object.assign({}, options, {path: subPath, operand});
      elemental(childOptions, parentOptions);
    });
  }

  addStatement(options, parentOptions);
}

function addStatement(options, parentOptions) {
  let {logicBlock, flatten, symbolTable} = options;
  let {operand, operator, path = '__self'} = options;
  let symbolName = getId();
  let statement = `evaluate(o, '${path}', ${flatten}, '${operator}', symbolTable, '${symbolName}')`;
  
  if('$regexp'.startsWith(operator) && typeof operand === 'string') {
    operand = new RegExp(operand, parentOptions.operand.$options);
  }

  symbolTable[symbolName] = operand;
  logicBlock.add(statement);
}

function logical(options) {
  let {operator, operand} = options;
  
  if(operator === '$not' && !isPlainObject(operand)) {
    options.operator = '$ne';
    return elemental(options);
  }
  
  options.logicBlock = options.logicBlock.group(operator);
  
  if(Array.isArray(operand)) {
    return operand.forEach((operand) => {
      let childOptions = Object.assign({}, options, {operand});
      expression(childOptions);
    });
  }
  
  expression(options);
}
