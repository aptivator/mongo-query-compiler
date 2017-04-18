let {expect} = require('chai');
let data = require('../../fixtures/data');
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
});
