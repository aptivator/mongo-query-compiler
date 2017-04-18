let {expect} = require('chai');
let data = require('../../../fixtures/data');
let compiler = require('../../../../dist/compiler');

describe('$type', () => {
  it(`performs type assessment using lodash's is functions`, () => {
    let query = compiler({_id: {$type: 'integer'}, $type: {name: 'string'}});
    let results = data.filter(query);
    expect(results.length).to.equal(6);
  });
});
