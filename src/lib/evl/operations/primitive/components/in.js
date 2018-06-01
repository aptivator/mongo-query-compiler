import _ from 'lodash';

export default (...args) => {
  _.each(args, (arg, idx, args) => {
    if(!_.isArray(arg)) {
      args[idx] = [arg];
    }
  });

  let [values, testValues] = args;
  
  if(!testValues.length) {
    return;
  }
  
  for(let i = 0, leni = values.length; i < leni; i++) {
    for(let j = 0, value = values[i], lenj = testValues.length; j < lenj; j++) {
      let option = testValues[j];
      
      if(_.isRegExp(option) && option.test(value)) {
        break;
      }
      
      if(value === option) {
        break;
      }
      
      if(j === lenj - 1) {
        return false;
      }
    }
  }
  
  return true;
};
