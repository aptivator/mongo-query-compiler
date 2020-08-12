import _ from 'lodash';

export function generateComparator(operator) {
  return (values, testValue) => {
    if(!_.isArray(values)) {
      values = [values];
    }
    
    for(let value of values) {
      if(_[operator](value, testValue)) {
        return true;
      }
    }
  }; 
}
