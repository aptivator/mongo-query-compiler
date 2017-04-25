import _ from 'lodash';

export default op => {
  return (loperand, comparator) => {
    if(!_.isArray(loperand)) {
      loperand = [loperand];
    }
    
    for(let value of loperand) {
      if(_[op](value, comparator)) {
        return true;
      }
    }
  }; 
};
