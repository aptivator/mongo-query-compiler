import _               from 'lodash';
import {operatorTypes} from './vars';

export const utils = {
  makePath(parent, child) {
    if(!parent) {
      return child;
    }
    
    if(!child) {
      return parent;
    }
    
    return parent + '.' + child;
  },
  
  uniqueId: _.partial(_.uniqueId, 'v'),
  
  unwindOperand(operator, operand) {
    if(!_.isPlainObject(operand)) {
      return;
    }
    
    return !operand.$ref && !operatorTypes.objectAcceptors.includes(operator);
  }
};
