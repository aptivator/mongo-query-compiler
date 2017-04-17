import _ from 'lodash';

export default (loperand, roperand) => {
  for(let i = 0; i < 2; i++) {
    if(_.isArray(loperand) && !_.isObject(roperand)) {
      return loperand.includes(roperand);
    }
    
    [loperand, roperand] = [roperand, loperand];
  }
  
  if(_.isRegExp(roperand)) {
    return roperand.test(loperand);
  }
  
  return _.isEqual(loperand, roperand);
};
