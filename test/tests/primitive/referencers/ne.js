let {expect} = require('chai');
let data = require('../../../fixtures/data');
let compiler = require('../../../../dist/compiler');

describe('$ne', () => {
  it('performs inequality', () => {
    let query = compiler({_id: {$ne: 1}});
    let results = data.filter(query);
    expect(results.length).to.equal(5);
  });  
  
  it('performs deep inequality', () => {
    let query = compiler({favorites: {$ne: {artist: 'Picasso', food: 'pizza', color: 'black'}}});
    let results = data.filter(query);
    expect(results.length).to.equal(5);
  });
  
  it('supports $ref operator', () => {
    let query = compiler({'favorites.color': {$ne: {$ref: 'badges'}}});
    let results = data.filter(query);
    expect(results.length).to.equal(5);
  });
});