import _                   from 'lodash';
import {compileMongoQuery} from '../../../mongo-query-compiler';

export const arrayOperators = {
  $all(array, all) {
    if(!_.isArray(array)) {
      array = [array];
    }
    
    if(!_.isArray(all)) {
      all = [all];
    }

    return !_.difference(all, array).length;
  },
  
  $elemMatch(array, filterer, exists, o, symbolTable, symbolName) {
    if(!_.isArray(array)) {
      array = [array];
    }
    
    if(!_.isFunction(filterer)) {
      filterer = compileMongoQuery(filterer);
      symbolTable[symbolName] = filterer;
    }
    
    return !!_.filter(array, filterer).length;
  },
  
  $size(array, size) {
    if(!_.isArray(array)) {
      array = [array];
    }
    
    return array.length === size;
  }
};
