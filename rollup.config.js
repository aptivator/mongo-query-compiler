import buble from 'rollup-plugin-buble';
let packageJson = require('./package.json');
let {'jsnext:main': jsnext, main} = packageJson;

export default {
  moduleName: 'mongo-query-compiler',
  entry: 'src/compiler.js',
  targets: [{
    format: 'umd',
    dest: main
  }, {
    format: 'es',
    dest: jsnext
  }],
  globals: {
    lodash: '_',
    'object-browser': 'browser'
  },
  external: ['lodash', 'object-browser'],
  plugins: [
    buble({
      transforms: {
        dangerousForOf: true
      }
    })
  ]
};
