import {operatorTypes} from './vars';

export const utils = {
  isPlainObject(o) {
    return o && typeof o === 'object' && o.constructor === Object;
  },

  makePath(parent, child) {
    if(!parent) {
      return child;
    }
    
    if(!child) {
      return parent;
    }
    
    return parent + '.' + child;
  },
  
  uniqueId: (() => {
    let symbolCounter = 0;
    return () => 'v' + symbolCounter++;
  })(),
  
  unwindOperand(operator, operand) {
    if(!utils.isPlainObject(operand)) {
      return;
    }
    
    return !operand.$ref && !operatorTypes.objectAcceptors.includes(operator);
  }
};
