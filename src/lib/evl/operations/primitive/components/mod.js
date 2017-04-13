import _ from 'lodash';

export default (operand, mod) => {
  if(!_.isArray(mod) || mod.length !== 2) {
    throw new Error('modulo configuration should be a two-element array');
  }
  
  if(!_.isNumber(mod[0]) || !_.isNumber(mod[1])) {
    throw new Error('divisor and remainder should be numbers');
  }
  
  let [divisor, remainder] = mod;
  return operand.value % divisor === remainder;
};
