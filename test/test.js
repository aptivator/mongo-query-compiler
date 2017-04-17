let _ = require('lodash');

let compiler = require('../dist/compiler');

let docs = [{
  name: 'Dmitriy',
  otherName: 'Dmitriy'
}];

let query = {
  $where: 'this.name === this.otherName'
};

let func = compiler(query);
let result = docs.filter(func);
console.log(result);
