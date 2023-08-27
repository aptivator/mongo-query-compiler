import {comparators} from './comparators';

export function generateComparator(operator) {
  return (values, testValue) => {
    if(!Array.isArray(values)) {
      values = [values];
    }
    
    for(let value of values) {
      if(comparators[operator](value, testValue)) {
        return true;
      }
    }
  };
}
