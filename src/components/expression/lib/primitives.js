import _             from 'lodash';
import arrayOps      from '../../../lib/evl/operations/array/array';
import primitiveOps  from '../../../lib/evl/operations/primitive/primitive';
import referencerOps from '../../../lib/evl/operations/referencers/referencers';

export default _.keys(arrayOps).concat(_.keys(primitiveOps), _.keys(referencerOps));
