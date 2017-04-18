import _          from 'lodash';
import referencer from './referencer';

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
      
      roperand = referencer(o, roperand);
      return op(value, roperand);
    };
    return operations;
  }, operations);  
};