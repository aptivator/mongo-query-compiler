let {expect} = require('chai');
let data = require('../../fixtures/data');
let compiler = require('../../../dist/compiler');

describe('$nor', () => {
  it('performs explicit $nor operation using object of queries', () => {
    let query = compiler({favorites: {$nor: {artist: 'Noguchi', food: 'cake'}}});
    let results = data.filter(query);
    expect(results.length).to.equal(4);
  });
  
  it('performs explicit $nor operaiton using array of queries', () => {
    let query = compiler({favorites: {$nor: [{artist: 'Noguchi'}, {food: 'cake'}]}});
    let results = data.filter(query);
    expect(results.length).to.equal(4);
  });
});
