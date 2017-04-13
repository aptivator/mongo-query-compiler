import _      from 'lodash';

export default (loperand, roperand) => {
  if(_.isArray(loperand) && !_.isObject(roperand)) {
    return loperand.includes(roperand);
  }
  
  if(_.isRegExp(roperand)) {
    return roperand.test(loperand);
  }
  
  return _.isEqual(loperand, roperand);
};
