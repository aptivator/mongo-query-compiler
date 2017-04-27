let {expect} = require('chai');
let data = require('../../../data/data');
let compiler = require('../../../../dist/compiler');

describe('$gt', () => {
  it('performs greater than comparison', () => {
    let query = compiler({_id: {$gt: 3}});
    let results = data.filter(query);
    expect(results.length).to.equal(3);
  });
});
