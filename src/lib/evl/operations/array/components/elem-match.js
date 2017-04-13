import _        from 'lodash';
import compiler from '../../../../../compiler';

export default (array, filterer, symbolTable, var_) => {
  if(!_.isFunction(filterer)) {
    filterer = compiler(filterer);
    symbolTable[var_] = filterer;
  }
  
  return _.filter(array, filterer).length;
};
