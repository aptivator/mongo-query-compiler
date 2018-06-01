import _          from 'lodash';
import pather     from '../../lib/pather';
import ignoreds   from './lib/ignoreds';
import elementals from './lib/elementals';
import logicals   from './lib/logicals';

export default function(parentPath, query, iffer, flatten) {
  if(query.hasOwnProperty('$flatten')) {
    flatten = !!query.$flatten;
    delete query.$flatten;
  }
  
  _.each(query, (query, op) => {
    if(ignoreds.includes(op)) {
      return;
    }
    
    if(elementals.includes(op)) {
      return this.elemental(parentPath, query, op, iffer, flatten);
    } 
    
    if(logicals.includes(op)) {
      return this.logical(parentPath, query, op, iffer, flatten);
    } 
    
    let path = pather(parentPath, op);
      
    if(_.isPlainObject(query)) {
      return this.expression(path, query, iffer, flatten);
    } 
    
    this.elemental(path, query, '$eq', iffer, flatten);
  });
}
