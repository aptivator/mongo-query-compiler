let {expect} = require('chai');
let data = require('../../fixtures/data');
let compiler = require('../../../dist/compiler');

describe('$not', () => {
  it('is equivalent to $ne', () => {
    let query = compiler({_id: {$not: 1}});
    let results = data.filter(query);
    expect(results.length).to.equal(5);
  });
  
  it('negates primitives', () => {
    let query = compiler({_id: {$not: {$eq: 1}}});
    let results = data.filter(query);
    expect(results.length).to.equal(5);
    
    query = compiler({_id: {$not: {$gt: 1}}});
    results = data.filter(query);
    expect(results.length).to.equal(1);
    
    query = compiler({badges: {$not: {$all: ['orange']}}});
    results = data.filter(query);
    expect(results.length).to.equal(5);
  });
  
  it('negates $and operation', () => {
    let query = compiler({favorites: {$not: {$and: {artist: 'Picasso', food: 'pizza'}}}});
    let results = data.filter(query);
    expect(results.length).to.equal(4);
  });
  
  it('negates $or operation', () => {
    let query = compiler({'badges.0': {$not: {$or: [{$eq: 'black'}, {$eq: 'green'}]}}});
    let results = data.filter(query);
    expect(results.length).to.equal(3);
  });
  
  it('negates $nor operation', () => {
    let query = compiler({favorites: {$not: {$nor: {artist: 'Cassatt', food: 'meringue'}}}});
    let results = data.filter(query);
    expect(results.length).to.equal(2);
  });
});
