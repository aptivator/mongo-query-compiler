import _         from 'lodash';
import {browser} from 'object-browser';

export function addExistenceReferencePreprocessing(operators) {
  return _.mapValues(operators, (operate, operatorName) => {
    return function(value, testValue, exists, o) {
      if(!exists) {
        return;
      }
      
      if(_.isPlainObject(testValue)) {
        let {$ref, $flatten: flatten} = testValue;
        
        if($ref) {
          arguments[1] = browser(o, $ref, {flatten});
        }
      }
      
      return operate(...arguments);
    };
  });
}
