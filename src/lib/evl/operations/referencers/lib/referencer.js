import _       from 'lodash';
import browser from 'object-browser';

export default (o, operand) => {
  if(_.isPlainObject(operand)) {
    let {$ref} = operand;
    
    if($ref) {
      return browser(o, $ref);
    }
  }
  
  return operand;
};
