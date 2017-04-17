import _            from 'lodash';
import Iffer        from '../../lib/iffer';
import ifferParamer from './lib/iffer-paramer';

export default function(path, query, op, iffer_) {
  let ifferParams = ifferParamer(op);
  let iffer = iffer_;
  
  if(!iffer) {
    iffer = new Iffer(...ifferParams);
  } else {
    iffer.group(...ifferParams);
  }
  
  if(_.isArray(query)) {
    _.each(query, operand => {
      this.expression(path, operand, iffer);
    });
  } else {
    this.expression(path, query, iffer);
  }
  
  if(!iffer_) {
    iffer.return(this.writer);
    //console.log(iffer.return());
  } else {
    iffer.groupClose();
  }
}
