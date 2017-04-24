import _              from 'lodash';
import Iffer          from '../../lib/iffer';
import pather         from '../../lib/pather';
import unwindAssessor from './lib/unwind-assessor';

export default function(path, query, op, iffer_) {
  if(unwindAssessor(path, query, op)) {
    return _.each(query, (query, path_) => {
      path_ = pather(path, path_);
      this.primitive(path_, query, op, iffer_);
    });
  }

  if(!path) {
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
