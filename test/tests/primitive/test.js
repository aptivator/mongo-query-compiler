let {expect} = require('chai');
let compiler = require('../../../dist/compiler');

describe('documentation tests', () => {
  it('test', () => {
    let records = [
      {name: 'Bill', timeSheet: [8, 8.5, 8.1, 8, 8]},
      {name: 'Joane', timeSheet: [7.9, 8, 8, 8.2, 8]},
      {name: 'Stuart', timeSheet: [7.5, 7, 8, 8, 8.2]}
    ];
    
    let query = compiler({timeSheet: {$gt: 8, $lt: 8.1}});
    let results = records.filter(query);
    console.log(results);
  });
});

