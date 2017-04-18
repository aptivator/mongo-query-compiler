let {expect} = require('chai');
let data = require('../../fixtures/data');
let compiler = require('../../../dist/compiler');

describe('$all', () => {
  it(`selects documents based on arrays that include all the listed values`, () => {
    let query = compiler({badges: {$all: ['blue']}});
    let results = data.filter(query);
    expect(results.length).to.equal(3);
  });
  
  it('throws an error if the operation is requested on an non-array type', () => {
    let query = compiler({_id: {$all: [1]}});
    expect(() => data.filter(query)).to.throw(/applied to an array/);
  });
});
