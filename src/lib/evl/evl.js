import browser    from 'object-browser';
import operations from './lib/operations-aggregator';

export default (o, path, opName, testValue, symbolTable, symbolName) => {
  let loperand = browser(o, path, {exists: true});
  let {value, exists} = loperand;
  return !operations[opName](value, testValue, exists, o, symbolTable, symbolName);
};
