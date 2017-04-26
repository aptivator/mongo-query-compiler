import _            from 'lodash';
import arrayOps     from '../../../lib/evl/operations/array/array';
import freeFormOps  from '../../../lib/evl/operations/free-form/free-form';
import primitiveOps from '../../../lib/evl/operations/primitive/primitive';

export default _.keys(arrayOps).concat(_.keys(freeFormOps), _.keys(primitiveOps));
