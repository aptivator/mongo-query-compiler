let {expect} = require('chai');
let data = require('../../../data/data');
let compiler = require('../../../../dist/compiler');

describe('$all', () => {
  it(`selects documents based on arrays that include all the listed values`, () => {
    let query = compiler({badges: {$all: ['blue']}});
    let results = data.filter(query);
    expect(results.length).to.equal(3);
  });
  
  it('converts non-array values and options into arrays', () => {
    let query = compiler({_id: {$all: 1}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
});
