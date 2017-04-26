import _ from 'lodash';

export default (value, type) => {
  type = 'is' + _.capitalize(type);
  let typer = _[type];
  
  if(!typer) {
    return console.warn('only lodash-based types are supported');
  }
  
  return typer(value);
};
