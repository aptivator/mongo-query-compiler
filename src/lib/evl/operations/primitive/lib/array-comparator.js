import _ from 'lodash';

export default op => {
  return (values, testValue) => {
    if(!_.isArray(values)) {
      values = [values];
    }
    
    for(let value of values) {
      if(_[op](value, testValue)) {
        return true;
      }
    }
  }; 
};
