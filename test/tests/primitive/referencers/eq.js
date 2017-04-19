let _ = require('lodash');
let {expect} = require('chai');
let data = require('../../../data/data');
let compiler = require('../../../../dist/compiler');

describe('$eq', () => {
  it('performs colon equality', () => {
    let query = compiler({_id: 1});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('allows colon equality with compound property access', () => {
    let query = compiler({'favorites.food': 'pizza'});
    let results = data.filter(query);
    expect(results.length).to.be.above(0);
  });
  
  it('augments nested access paths', () => {
    let query = compiler({favorites: {food: 'pizza'}});
    let results = data.filter(query);
    expect(results.length).to.be.above(0);
  });
  
  it('allows nested $eq operator', () => {
    let query = compiler({_id: {$eq: 1}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('allows nested property access key', () => {
    let query = compiler({$eq: {'favorites.food': 'pizza'}});
    let results = data.filter(query);
    expect(results.length).to.be.above(0);
  });
  
  it('performs deep equality if object follows $eq', () => {
    let query = compiler({favorites: {$eq: {artist: 'Picasso', food: 'pizza'}}});
    let results = data.filter(query);
    expect(results.length).to.be.above(0);
    
    query = compiler({favorites: {$eq: {artist: 'Picasso'}}});
    results = data.filter(query);
    expect(results.length).to.equal(0);
  });
  
  it('supports $ref operator', () => {
    let query = compiler({favorites: {color: {$eq: {$ref: 'badges.0'}}}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('perfroms equality when one operand is an array', () => {
    let query = compiler({badges: 'blue'});
    let results = data.filter(query);
    expect(results.length).to.be.above(0);
    
    query = compiler({favorites: {color: {$eq: {$ref: 'badges'}}}});
    results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('performs regular expression equality', () => {
    let query = compiler({name: /^s/});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('conducts deep array equality', () => {
    let query = compiler({finished: [17, 3]});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('some test', () => {
let records = [
  {name: 'Bill', timeSheet: [8, 8.5, 8.1, 8, 8]},
  {name: 'Joane', timeSheet: [7.9, 8, 8, 8.2, 10]},
  {name: 'Stuart', timeSheet: [7.5, 7, 8, 8, 8.2]}
];

let query = compiler({
  $where(o, browser) {
    let {timeSheet} = this;
    let sum = _.reduce(timeSheet, (sum, hours) => sum += hours);
    return sum < 40;
  }
});

let results = records.filter(query);
console.log(results);
  })
});
