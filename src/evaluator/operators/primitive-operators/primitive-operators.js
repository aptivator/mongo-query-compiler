import _                    from 'lodash';
import isEqual              from 'lodash.isequal';
import isRegExp             from 'lodash.isregexp';
import {generateComparator} from './_lib/comparator-generator';

export const primitiveOperators = {
  $eq(value, testValue) {
    for(let i = 0; i < 2; i++) {
      if(Array.isArray(value) && typeof testValue !== 'object') {
        return value.includes(testValue);
      }
      
      [value, testValue] = [testValue, value];
    }
    
    if(isRegExp(testValue)) {
      return testValue.test(value);
    }
    
    return isEqual(value, testValue);
  },
  
  $exists(value, testValue, exists) {
    return testValue === exists;
  },
  
  $gt: generateComparator('gt'),
  
  $gte: generateComparator('gte'),
  
  $in(values, testValues) {
    [values, testValues] = [values, testValues].map((arr) => {
      return Array.isArray(arr) ? arr : [arr];
    });

    if(testValues.length) {
      for(let i = 0; i < values.length; i++) {
        for(let j = 0, value = values[i]; j < testValues.length; j++) {
          let options = testValues[j];
          
          if(isRegExp(options) && options.test(value)) {
            break;
          } else if(value === options) {
            break;
          } else if(j === testValues.length - 1) {
            return;
          }
        }
      }
      
      return true;
    }
  },
  
  $lt: generateComparator('lt'),
  
  $lte: generateComparator('lte'),
  
  $mod(value, [divisor, remainder]) {
    return value % divisor === remainder;
  },
  
  $ne() {
    return !primitiveOperators.$eq(...arguments);
  },
  
  $nin() {
    return !primitiveOperators.$in(...arguments);
  },
  
  $regex() {
    return primitiveOperators.$regexp(...arguments);
  },

  $regexp(value, testValue) {
    return testValue.test(value);
  },
  
  $type(value, type) {
    type = 'is' + _.capitalize(type);
    return _[type](value);
  }
};
