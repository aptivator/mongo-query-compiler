import varId_ from './lib/var-id';

export default function(value) {
  let varId = varId_();
  this._d[varId] = value;
  return [varId, `d.${varId}`];
}
