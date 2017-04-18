import _ from 'lodash';

let eqOps = ['$eq', '$ne'];
let objectAcceptors = eqOps.concat('$elemMatch');

export default (path, query, op) => {
  if(!path && eqOps.includes(op)) {
    return true;
  }
  
  if(_.isPlainObject(query)) {
    if(!query['$ref'] && !objectAcceptors.includes(op)) {
      return true;
    }
  }
};
