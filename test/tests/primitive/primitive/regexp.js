let {expect} = require('chai');
let data = require('../../../data/data');
let compiler = require('../../../../dist/compiler');

describe('$regexp', () => {
  it('performs regular expression test', () => {
    let query = compiler({$regexp: {name: /^x/}});
    let results = data.filter(query);
    expect(results.length).to.equal(2);
  });
});
