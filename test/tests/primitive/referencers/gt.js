let {expect} = require('chai');
let data = require('../../../fixtures/data');
let compiler = require('../../../../dist/compiler');

describe('$gt', () => {
  it('performs greater than comparison', () => {
    let query = compiler({_id: {$gt: 3}});
    let results = data.filter(query);
    expect(results.length).to.equal(3);
  });
  
  it('supports $ref operator', () => {
    let query = compiler({_id: {$gt: {$ref: 'type'}}});
    let results = data.filter(query);
    expect(results.length).to.equal(5);
  });
});
