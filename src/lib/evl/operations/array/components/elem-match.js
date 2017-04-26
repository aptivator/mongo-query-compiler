import _        from 'lodash';
import compiler from '../../../../../compiler';

export default (array, filterer, exists, o, symbolTable, symbolName) => {
  if(!_.isFunction(filterer)) {
    filterer = compiler(filterer);
    symbolTable[symbolName] = filterer;
  }
  
  return _.filter(array, filterer).length;
};
