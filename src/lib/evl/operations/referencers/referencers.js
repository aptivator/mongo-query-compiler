import $eq     from './components/eq';
import $ne     from './components/ne';
import $gt     from './components/gt';
import $gte    from './components/gte';
import $lt     from './components/lt';
import $lte    from './components/lte';
import wrapper from './lib/referencer-wrapper';

export default wrapper({$eq, $ne, $gt, $gte, $lt, $lte});
