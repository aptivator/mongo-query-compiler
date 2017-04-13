import _ from 'lodash';

export default (operand, options) => {
  let {value: values} = operand;
  
  if(!_.isArray(options)) {
    throw new Error('[$in and $nin] operators must specify an array of values');
  }
  
  if(!_.isArray(values)) {
    values = [values];
  }
  
  for(let i = 0, leni = values.length; i < leni; i++) {
    for(let j = 0, value = values[i], lenj = options.length; j < lenj; j++) {
      let option = options[j];
      
      if(_.isRegExp(option)) {
        if(option.test(value)) {
          break;
        }
      } else if(value === option) {
        break;
      }
      
      if(j === lenj - 1) {
        return false;
      }
    }
  }
  
  return true;
};
