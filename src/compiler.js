import _        from 'lodash';
import Compiler from './components/constructor';

export default query => {
  if(!_.isPlainObject(query)) {
    throw new Error('query must be an object');
  }
  
  return new Compiler(query);
};
