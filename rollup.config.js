import babel from 'rollup-plugin-babel';
let packageJson = require('./package.json');
let {'jsnext:main': jsnext, main, name} = packageJson;

export default {
  input: 'src/mongo-query-compiler.js',
  output: [{
    format: 'umd',
    file: main,
    name,
    globals: {
      lodash: '_',
      'object-browser': 'browser',
    }
  }, {
    format: 'es',
    file: jsnext,
    name
  }],
  external: ['lodash', 'object-browser'],
  plugins: [
    babel()
  ]
};
