import _ from 'lodash';

export default (operand, type) => {
  type = 'is' + _.capitalize(type);
  let typer = _[type];
  
  if(!typer) {
    throw new Error('only lodash-based types are supported');
  }
  
  return typer(operand.value);
};
