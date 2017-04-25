let {expect} = require('chai');
let compiler = require('../../../dist/compiler');

describe('documentation tests', () => {
  it('test', () => {
    let records = [
      {name: 'Bill', timeSheet: [8, 8.5, 8.1, 8, 8]},
      {name: 'Joane', timeSheet: [7.9, 8, 8, 8.2, 10]},
      {name: 'Stuart', timeSheet: [7.5, 7, 8, 8, 8.2]}
    ];
    
    let query = compiler({timeSheet: {$or: {$gt: 8.5, $lt: 8}}});
    let results = records.filter(query);
    console.log(results);
  });
});

