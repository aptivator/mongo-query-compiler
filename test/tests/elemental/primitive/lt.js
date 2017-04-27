let {expect} = require('chai');
let data = require('../../../data/data');
let compiler = require('../../../../dist/compiler');

describe('$lt', () => {
  it('performs less than comparison', () => {
    let query = compiler({_id: {$lt: 3}});
    let results = data.filter(query);
    expect(results.length).to.equal(2);
  });
});
