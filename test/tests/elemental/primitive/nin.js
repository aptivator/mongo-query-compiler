let {expect} = require('chai');
let data = require('../../../data/data');
let compiler = require('../../../../dist/compiler');

describe('$nin', () => {
  it('checks to see if a referenced value is NOT included in a specified array', () => {
    let query = compiler({_id: {$nin: [6]}});
    let results = data.filter(query);
    expect(results.length).to.equal(5);
  });
  
  it('allows reference path to be nested', () => {
    let query = compiler({$nin: {_id: [6]}});
    let results = data.filter(query);
    expect(results.length).to.equal(5);
  });
  
  it('can be perfromed on arrays', () => {
    let query = compiler({badges: {$nin: ['orange']}});
    let results = data.filter(query);
    expect(results.length).to.equal(5);
  });
});
