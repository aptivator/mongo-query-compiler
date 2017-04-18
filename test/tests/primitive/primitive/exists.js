let {expect} = require('chai');
let data = require('../../../data/data');
let compiler = require('../../../../dist/compiler');

describe('$exists', () => {
  it('determines if a value exists', () => {
    let query = compiler({'favorites.color': {$exists: true}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
});
