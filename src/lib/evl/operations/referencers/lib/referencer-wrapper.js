import _          from 'lodash';
import referencer from './referencer';

export default operations => {
  return _.reduce(operations, (operations, op, opName) => {
    operations[opName] = (o, loperand, roperand) => {
      roperand = referencer(o, roperand);
      return op(loperand, roperand);
    };
    return operations;
  }, operations);  
};
