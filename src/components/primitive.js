import _     from 'lodash';
import Iffer from '../lib/iffer';

export default function(path, value, op, iffer_) {
  if(!path) {
    if(_.isPlainObject(value)) {
      return _.each(value, (value, path) => {
        this.primitive(path, value, op, iffer);
      });
    }
    
    path = '__self';
  }
  
  let iffer = iffer_;
  let [var_, tablePath] = this.datum(value);
  let condition = `evl(o, '${path}', '${op}', ${tablePath}, d, '${var_}')`;
  
  if(iffer) {
    return iffer.add(condition);
  }
  
  new Iffer(condition, true).return(this.writer);
}
