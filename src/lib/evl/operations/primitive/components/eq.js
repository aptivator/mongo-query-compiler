import _ from 'lodash';

export default (value, testValue) => {
  for(let i = 0; i < 2; i++) {
    if(_.isArray(value) && !_.isObject(testValue)) {
      return value.includes(testValue);
    }
    
    [value, testValue] = [testValue, value];
  }
  
  if(_.isRegExp(testValue)) {
    return testValue.test(value);
  }
  
  return _.isEqual(value, testValue);
};
