let {expect} = require('chai');
let data = require('../../data/data');
let compiler = require('../../../dist/compiler');

describe('$or', () => {
  it('performs explicit $or operation using object of queries', () => {
    let query = compiler({favorites: {$or: {artist: 'Picasso', food: 'cake'}}});
    let results = data.filter(query);
    expect(results.length).to.equal(3);
  });
  
  it('performs explicit $or operaiton using array of queries', () => {
    let query = compiler({favorites: {$or: [{artist: 'Picasso'}, {food: 'cake'}]}});
    let results = data.filter(query);
    expect(results.length).to.equal(3);
  });
  
  it('performs explict $or with query namespacing', () => {
    let query = compiler({favorites: {$or: {artist: 'Picasso', '': {artist: 'Miro'}}}});
    let results = data.filter(query);
    expect(results.length).to.equal(3);
  });
});
