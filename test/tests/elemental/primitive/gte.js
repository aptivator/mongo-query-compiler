let {expect} = require('chai');
let data = require('../../../data/data');
let compiler = require('../../../../dist/compiler');

describe('$gte', () => {
  it('performs greater than or equal comparison', () => {
    let query = compiler({_id: {$gte: 3}});
    let results = data.filter(query);
    expect(results.length).to.equal(4);
  });
});
