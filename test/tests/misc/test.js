let {expect} = require('chai');
let compiler = require('../../../dist/compiler');

describe('documentation tests', () => {
  it('test', () => {
let records = [{
  name: 'Ivan',
  age: 27,
  cars: [
    {brand: 'toyota', model: 'camry', year: 2008},
    {brand: 'nissan', model: 'sentra', year: 2010}
  ]
}, {
  name: 'Charlie',
  age: 57,
  cars: [
    {brand: 'acura', model: 'tl', year: 2015}
  ]
}];

let query = compiler({cars: {brand: 'toyota', year: {$or: {'': 2008, $eq: 2009, $something: 'sdfsd'}}}});
let results = records.filter(query);
    console.log(results);
  });
});
