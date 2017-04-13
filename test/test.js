let _ = require('lodash');

let compiler = require('../dist/compiler');

let docs = [{
  name: 'Dmitriy',
  age: 25,
  otherName: 'Dmitriyf',
  hobbies: ['yoga', 'skiing']
}];

let arr = [22, 24, 234];

let query1 = {
  $lt: 40,
  $gt: 20,
  $eq: 24,
  $nin: [23, 25, 27]
};

let query = {
  $not: {
    $and: [{
      name: 'Dmitriyf'
    }, {
      age: 25
    }]
  }
};

let time = Date.now();

let func = compiler(query1);
let results = _.filter(arr, func);
console.log(results);
console.log(Date.now() - time);
