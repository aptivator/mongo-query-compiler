import $eq     from './components/eq';
import $in     from './components/in';
import $ne     from './components/ne';
import $nin    from './components/nin';
import $gt     from './components/gt';
import $gte    from './components/gte';
import $lt     from './components/lt';
import $lte    from './components/lte';
import wrapper from './lib/referencer-wrapper';

export default wrapper({$eq, $in, $ne, $nin, $gt, $gte, $lt, $lte});
