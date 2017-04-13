import _          from 'lodash';
import evl        from '../lib/evl/evl';
import compound   from './compound/compound';
import datum      from './datum/datum';
import expression from './expression/expression';
import primitive  from './primitive';
import writer     from './writer';

function Compiler(query) {
  let _d = {};
  let {writer} = this;
  
  _.extend(this, {
    _code: '', 
    _d, 
    writer: writer.bind(this)
  });
  
  this.expression('', query);
  
  this.writer('return true;');
  
  let func = new Function('o', 'd', 'evl', this._code);
  
  return _.partial(func, _, _d, evl);
}

_.extend(Compiler.prototype, {compound, datum, expression, primitive, writer});

export default Compiler;
