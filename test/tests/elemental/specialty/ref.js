let {expect} = require('chai');
let data = require('../../../data/data');
let compiler = require('../../../../dist/compiler');

describe('$ref', () => {
  it('works in $eq', () => {
    let query = compiler({favorites: {color: {$eq: {$ref: 'badges.0'}}}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('runs in $gt', () => {
    let query = compiler({finished: {$lt: {$ref: 'age'}}});
    let results = data.filter(query);
    expect(results.length).to.equal(6);
  });
  
  it('works in $gte', () => {
    let query = compiler({_id: {$gte: {$ref: 'type'}}});
    let results = data.filter(query);
    expect(results.length).to.equal(6);
  });
  
  it('performs in $in', () => {
    let query = compiler({'points.bonus': {$in: {$ref: 'finished'}}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('operates in $all', () => {
    let query = compiler({finished: {$all: {$ref: 'points.bonus'}}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
});
