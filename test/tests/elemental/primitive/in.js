let {expect} = require('chai');
let data = require('../../../data/data');
let compiler = require('../../../../dist/compiler');

describe('$in', () => {
  it('checks to see if a referenced value is included in a specified array', () => {
    let query = compiler({_id: {$in: [6]}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('allows reference path to be nested', () => {
    let query = compiler({$in: {_id: [6]}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('can be perfromed on arrays', () => {
    let query = compiler({badges: {$in: ['orange']}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
});
