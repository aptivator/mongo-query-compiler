import {expect}            from 'chai';
import data                from '../../_fixtures/data';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$eq', () => {
  it('performs colon equality', () => {
    let query = compileMongoQuery({_id: 1});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('allows colon equality with compound property access', () => {
    let query = compileMongoQuery({'favorites.food': 'pizza'});
    let results = data.filter(query);
    expect(results.length).to.be.above(0);
  });
  
  it('augments nested access paths', () => {
    let query = compileMongoQuery({favorites: {food: 'pizza'}});
    let results = data.filter(query);
    expect(results.length).to.be.above(0);
  });
  
  it('allows nested $eq operator', () => {
    let query = compileMongoQuery({_id: {$eq: 1}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('allows nested property access key', () => {
    let query = compileMongoQuery({'favorites.food': {$eq: 'pizza'}});
    let results = data.filter(query);
    expect(results.length).to.equal(2);
  });
  
  it('performs deep equality if object follows $eq', () => {
    let query = compileMongoQuery({favorites: {$eq: {artist: 'Picasso', food: 'pizza'}}});
    let results = data.filter(query);
    expect(results.length).to.be.above(0);
    
    query = compileMongoQuery({favorites: {$eq: {artist: 'Picasso'}}});
    results = data.filter(query);
    expect(results.length).to.equal(0);
  });
  
  it('perfroms equality when one operand is an array', () => {
    let query = compileMongoQuery({badges: 'blue'});
    let results = data.filter(query);
    expect(results.length).to.be.above(0);
    
    query = compileMongoQuery({favorites: {color: {$eq: ['black', 'blue']}}});
    results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('performs regular expression equality', () => {
    let query = compileMongoQuery({name: /^s/});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('conducts deep array equality', () => {
    let query = compileMongoQuery({finished: [17, 3]});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
});
