import _          from 'lodash';
import pather     from '../../lib/pather';
import compounds  from './lib/compounds';
import ignoreds   from './lib/ignoreds';
import primitives from './lib/primitives';

export default function(parentPath, query, iffer) {
  _.each(query, (operand, op) => {
    if(ignoreds.includes(op)) {
      return;
    }
    
    if(primitives.includes(op)) {
      return this.primitive(parentPath, operand, op, iffer);
    } 
    
    if(compounds.includes(op)) {
      return this.compound(parentPath, operand, op, iffer);
    } 
    
    let path = pather(parentPath, op);
      
    if(_.isPlainObject(operand)) {
      return this.expression(path, operand, iffer);
    } 
    
    this.primitive(path, operand, '$eq', iffer);
  });
}
