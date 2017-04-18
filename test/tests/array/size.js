let {expect} = require('chai');
let data = require('../../fixtures/data');
let compiler = require('../../../dist/compiler');

describe('$size', () => {
  it(`selects documents based on the size of some array`, () => {
    let query = compiler({$size: {badges: 1}});
    let results = data.filter(query);
    expect(results.length).to.equal(2);
  });
});
