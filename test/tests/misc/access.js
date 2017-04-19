let {expect} = require('chai');
let data = require('../../data/data');
let compiler = require('../../../dist/compiler');

describe('access of nested array documents', () => {
  it('it "sees through" an array', () => {
    let query = compiler({points: {points: 85}});
    let results = data.filter(query);
    expect(results.length).to.equal(2);
  });
});
