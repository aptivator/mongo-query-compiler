import _     from 'lodash';
import Iffer from '../lib/iffer';

export default function(path, query, op, iffer_) {
  if(!path) {
    if(_.isPlainObject(query)) {
      return _.each(query, (query, path) => {
        this.primitive(path, query, op, iffer);
      });
    }
    
    path = '__self';
  }
  
  let iffer = iffer_;
  let symbolName = this.datum(query);
  let condition = `evl(o, '${path}', '${op}', d.${symbolName}, d, '${symbolName}')`;
  
  if(iffer) {
    return iffer.add(condition);
  }
  
  new Iffer(condition).return(this.writer);
}
