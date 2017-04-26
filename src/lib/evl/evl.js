import browser    from 'object-browser';
import operations from './lib/operations-aggregator';

export default (o, path, op, testValue, symbolTable, symbolName) => {
  let loperand = browser(o, path, {exists: true});
  let {value, exists} = loperand;
  
  op = operations[op];
  
  if(op) {
    return !op(value, testValue, exists, o, symbolTable, symbolName);
  }
  
  throw new Error(`operator [${op}] is invalid`);
};
