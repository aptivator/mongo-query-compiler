import _ from 'lodash';

export default (operand, all) => {
  if(!_.isArray(all)) {
    all = [all];
  }
  
  return !_.difference(all, operand).length;
};
