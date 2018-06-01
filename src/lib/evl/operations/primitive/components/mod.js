import _ from 'lodash';

export default (value, testValue) => {
  if(!_.isArray(testValue)) {
    testValue = [testValue];
  }
  
  let [divisor, remainder] = testValue;
  
  if(!_.isNumber(divisor) || !_.isNumber(remainder)) {
    throw new Error('divisor and remainder should be numbers');
  }
  
  return value % divisor === remainder;
};
