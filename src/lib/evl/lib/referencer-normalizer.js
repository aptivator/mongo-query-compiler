import _       from 'lodash';
import browser from 'object-browser';

export default operations => {
  return _.reduce(operations, (operations, op, opName) => {
    operations[opName] = (value, testValue, exists, o, symbolTable, symbolName) => {
      if(!exists) {
        if(!['$ne', '$nin'].includes(opName)) {
          return false;
        }
        
        return true;
      }
      
      if(_.isPlainObject(testValue)) {
        let {$ref, $flatten: flatten} = testValue;
        if($ref) {
          testValue = browser(o, $ref, {flatten});
        }
      }

      return op(value, testValue, exists, o, symbolTable, symbolName);
    };
    
    return operations;
  }, {});  
};
