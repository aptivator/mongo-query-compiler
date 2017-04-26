import _ from 'lodash';

export default operations => {
  return _.reduce(operations, (operations, op, opName) => {
    operations[opName] = (array, ...rest) => {
      if(!_.isArray(array)) {
        array = [array];
      }
      
      rest.unshift(array);
      
      return op(...rest);
    };
    
    return operations;
  }, {});
};
