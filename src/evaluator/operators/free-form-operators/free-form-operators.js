import {browser} from 'object-browser';

export const freeFormOperators = {
  $where(value, callback, exists, o, symbolTable, symbolName) {
    if(typeof callback === 'string') {
      callback = new Function(`return ${callback};`);
      symbolTable[symbolName] = callback;
    }
    
    return callback.apply(o, callback.length ? [o, browser] : []);
  }  
};
