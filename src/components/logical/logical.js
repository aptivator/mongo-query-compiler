import _            from 'lodash';
import Iffer        from '../../lib/iffer';
import ifferParamer from './lib/iffer-paramer';

export default function(path, query, op, iffer_, flatten) {
  let ifferParams = ifferParamer(op);
  let iffer = iffer_;
  
  if(op === '$not' && !_.isPlainObject(query)) {
    return this.elemental(path, query, '$ne', iffer_, flatten);
  }
  
  if(!iffer) {
    iffer = new Iffer(...ifferParams);
  } else {
    iffer.group(...ifferParams);
  }
  
  if(_.isArray(query)) {
    _.each(query, query => {
      this.expression(path, query, iffer, flatten);
    });
  } else {
    this.expression(path, query, iffer, flatten);
  }
  
  if(!iffer_) {
    iffer.return(this.writer);
  } else {
    iffer.groupClose();
  }
}
