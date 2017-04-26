let {expect} = require('chai');
let data = require('../../../data/data');
let compiler = require('../../../../dist/compiler');

describe('$mod', () => {
  it('performs modulo operation', () => {
    let query = compiler({$mod: {_id: [2, 0]}});
    let results = data.filter(query);
    expect(results.length).to.equal(3);
  });
});
