import _       from 'lodash';
import browser from 'object-browser';

export default operations => {
  return _.reduce(operations, (operations, op, opName) => {
    operations[opName] = (o, loperand, roperand) => {
      let {exists, value} = loperand;
      
      if(!exists) {
        if(!['$ne', '$nin'].includes(opName)) {
          return false;
        }
        
        return true;
      }
      
      if(_.isPlainObject(roperand)) {
        let {$ref} = roperand;
        if($ref) {
          roperand = browser(o, $ref);
        }
      }

      return op(value, roperand);
    };
    return operations;
  }, operations);  
};
