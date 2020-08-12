import {browser}   from 'object-browser';
import {operators} from './operators/operators';

export function evaluate(o, path, flatten, operator, symbolTable, symbolName) {
  let {value, exists} = browser(o, path, {exists: true, flatten});
  let testValue = symbolTable[symbolName];
  return !operators[operator](value, testValue, exists, o, symbolTable, symbolName);
}
