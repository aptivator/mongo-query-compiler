import _ from 'lodash';

export default (values, all) => {
  if(!_.isArray(all)) {
    all = [all];
  }
  
  return !_.difference(all, values).length;
};
