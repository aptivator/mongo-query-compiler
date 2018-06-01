import _         from 'lodash';
import {browser} from 'object-browser';

export default (value, callback, exists, o, symbolTable, symbolName) => {
  if(_.isString(callback)) {
    callback = new Function(`return ${callback};`);
    symbolTable[symbolName] = callback;
  }
  
  return callback.apply(o, callback.length ? [o, browser] : []);
};
