let {expect} = require('chai');
let data = require('../../fixtures/data');
let compiler = require('../../../dist/compiler');

describe('$and', () => {
  it('performs implicit $and operation', () => {
    let query = compiler({_id: 1, name: /^s/});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('performs explicit $and operation using object of queries', () => {
    let query = compiler({favorites: {$and: {artist: 'Picasso', food: 'pizza'}}});
    let results = data.filter(query);
    expect(results.length).to.equal(2);
  });
  
  it('performs explicit $and operaiton using array of queries', () => {
    let query = compiler({favorites: {$and: [{artist: 'Picasso'}, {food: 'pizza'}]}});
    let results = data.filter(query);
    expect(results.length).to.equal(2);
  });
});
