let {expect} = require('chai');
let compiler = require('../../../dist/compiler');

describe('array of primitives', () => {
  it('searches an array of primitives', () => {
    let scores = [1, 2, 3, 4, 5, 6];
    let query = compiler({$gt: 2, $mod: [2, 0]});
    let results = scores.filter(query);
    expect(results.length).to.equal(2);
  });
});
