import {browser} from 'object-browser';
import {utils}   from '../../../_lib/utils';

export function addExistenceReferencePreprocessing(operators) {
  Object.entries(operators).forEach(([operatorName, operate]) => {
    operators[operatorName] = function(value, testValue, exists, o) {
      if(!exists) {
        return;
      }
      
      if(utils.isPlainObject(testValue)) {
        let {$ref, $flatten: flatten} = testValue;
        
        if($ref) {
          arguments[1] = browser(o, $ref, {flatten});
        }
      }
      
      return operate(...arguments);
    }
  });

  return operators;
}
