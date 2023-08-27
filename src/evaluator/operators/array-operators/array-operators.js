import {compileMongoQuery} from '../../../mongo-query-compiler';

export const arrayOperators = {
  $all(array, all) {
    [array, all] = [array, all].map((arr) => {
      return Array.isArray(arr) ? arr : [arr];
    });

    for(let value of all) {
      if(!array.includes(value)) {
        return;
      }
    }

    return true;
  },
  
  $elemMatch(array, filterer, exists, o, symbolTable, symbolName) {
    if(!Array.isArray(array)) {
      array = [array];
    }
    
    if(typeof filterer !== 'function') {
      filterer = compileMongoQuery(filterer);
      symbolTable[symbolName] = filterer;
    }
    
    return array.filter(filterer).length;
  },
  
  $size(array, size) {
    if(!Array.isArray(array)) {
      array = [array];
    }
    
    return array.length === size;
  }
};
