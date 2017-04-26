import _          from 'lodash';
import evl        from '../lib/evl/evl';
import datum      from './datum/datum';
import expression from './expression/expression';
import elemental  from './elemental/elemental';
import logical    from './logical/logical';
import writer     from './writer';

function Compiler(query) {
  let _d = {};
  
  _.extend(this, {
    _code: '', 
    _d, 
    writer: this.writer.bind(this)
  });
  
  this.expression('', query);
  this.writer('return true;');
  let func = new Function('o', 'd', 'evl', this._code);
  return _.partial(func, _, _d, evl);
}

_.extend(Compiler.prototype, {datum, expression, elemental, logical, writer});

export default Compiler;
