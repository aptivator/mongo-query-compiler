import pick                     from 'lodash.pick';
import path                     from 'path';
import {packageJsonBaseFields}  from './_lib/vars';
import {writePackageJsonPlugin} from './rollup-plugin-write-package-json/rollup-plugin-write-package-json.js';

let fileName = 'mongo-query-compiler';
let packageJson = require('../package.json');
let {name} = packageJson;
let input = `src/${fileName}.js`;
let main = `./${fileName}.js`;
let module = `./${fileName}.esm.js`;
let exports = {require: main, import: module};
let distDir = path.resolve(__dirname, '../dist');
let globals = {lodash: '_', 'object-browser': 'browser'};

packageJson = pick(packageJson, packageJsonBaseFields);
Object.assign(packageJson, {main, module, exports});

export default {
  input,
  output: [{
    format: 'esm',
    file: path.resolve(distDir, module),
    name,
    globals
  }, {
    format: 'umd',
    file: path.resolve(distDir, main),
    name,
    globals
  }],
  external: ['lodash', 'object-browser'],
  plugins: [
    writePackageJsonPlugin(packageJson, path.resolve(distDir, 'package.json'))
  ]
};
