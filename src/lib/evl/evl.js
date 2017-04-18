import _             from 'lodash';
import browser       from 'object-browser';
import arrayOps      from './operations/array/array';
import freeFormOps   from './operations/free-form/free-form';
import primitiveOps  from './operations/primitive/primitive';
import referencerOps from './operations/referencers/referencers';

export default (o, path, op, operand, symbolTable, operandName) => {
  let loperand = browser(o, path, {exists: true});
  let {value} = loperand;
  
  let arrayOp = arrayOps[op];
  
  if(arrayOp) {
    if(!_.isArray(value)) {
      throw new Error(`[${op}] operation must be applied to an array`);
    }

    return !arrayOp(value, operand, symbolTable, operandName);
  }
  
  let referencingOp = referencerOps[op];
  
  if(referencingOp) {
    return !referencingOp(o, loperand, operand);
  }
  
  let primitiveOp = primitiveOps[op];
  
  if(primitiveOp) {
    return !primitiveOp(loperand, operand);
  }
  
  let freeFormOp = freeFormOps[op];
  
  if(freeFormOp) {
    return !freeFormOp(o, operand, symbolTable, operandName);
  }
  
  throw new Error(`operator [${op}] is invalid`);
};
