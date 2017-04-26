import $all            from './components/all';
import $elemMatch      from './components/elem-match';
import $size           from './components/size';
import arrayNormalizer from './lib/array-normalizer';

export default arrayNormalizer({$all, $elemMatch, $size});
