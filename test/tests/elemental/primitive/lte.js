let {expect} = require('chai');
let data = require('../../../data/data');
let compiler = require('../../../../dist/compiler');

describe('$lte', () => {
  it('performs less than or equal comparison', () => {
    let query = compiler({_id: {$lte: 3}});
    let results = data.filter(query);
    expect(results.length).to.equal(3);
  });
});
