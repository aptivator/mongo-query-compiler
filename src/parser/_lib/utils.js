import {operatorTypes} from './vars';

export const getId = (() => {
  let symbolCounter = 0;
  return () => symbolCounter++;
})()

export function isPlainObject(o) {
  return o && o.constructor === Object;
}

export function isUnwindableOperand(operator, operand) {
  if(isPlainObject(operand)) {
    return !operand.$ref && !operatorTypes.objectAcceptors.has(operator);
  }
}

export function makePath(parent, child) {
  if(!parent) {
    return child;
  }
  
  if(!child) {
    return parent;
  }
  
  return parent + '.' + child;
}
