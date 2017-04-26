import _                    from 'lodash';
import arrayOperations      from '../operations/array/array';
import freeFormOperations   from '../operations/free-form/free-form';
import primitiveOperations  from '../operations/primitive/primitive';
import referencerNormalizer from './referencer-normalizer';

export default (() => {
  let operations = _.extend({}, arrayOperations, primitiveOperations);
  operations = referencerNormalizer(operations);
  return _.extend(operations, freeFormOperations);
})();
