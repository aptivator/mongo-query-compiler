import _          from 'lodash';
import pather     from '../../lib/pather';
import ignoreds   from './lib/ignoreds';
import elementals from './lib/elementals';
import logicals   from './lib/logicals';

export default function(parentPath, query, iffer) {
  _.each(query, (operand, op) => {
    if(ignoreds.includes(op)) {
      return;
    }
    
    if(elementals.includes(op)) {
      return this.elemental(parentPath, operand, op, iffer);
    } 
    
    if(logicals.includes(op)) {
      return this.logical(parentPath, operand, op, iffer);
    } 
    
    let path = pather(parentPath, op);
      
    if(_.isPlainObject(operand)) {
      return this.expression(path, operand, iffer);
    } 
    
    this.elemental(path, operand, '$eq', iffer);
  });
}
