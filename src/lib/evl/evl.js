import _                    from 'lodash';
import browser              from 'object-browser';
import arrayOperations      from './operations/array/array';
import freeFormOperations   from './operations/free-form/free-form';
import primitiveOperations  from './operations/primitive/primitive';
import referencerNormalizer from './lib/referencer-normalizer';

let operations = _.extend({}, arrayOperations, freeFormOperations, primitiveOperations);
operations = referencerNormalizer(operations);

export default (o, path, op, testValue, symbolTable, symbolName) => {
  let loperand = browser(o, path, {exists: true});
  let {value, exists} = loperand;
  
  op = operations[op];
  
  if(op) {
    return !op(value, testValue, exists, o, symbolTable, symbolName);
  }
  
  throw new Error(`operator [${op}] is invalid`);
};
