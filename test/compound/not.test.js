import {expect}            from 'chai';
import data                from '../_fixtures/data';
import {compileMongoQuery} from '../../src/mongo-query-compiler';

describe('$not', () => {
  it('is equivalent to $ne', () => {
    let query = compileMongoQuery({_id: {$not: 1}});
    let results = data.filter(query);
    expect(results.length).to.equal(5);
  });
  
  it('negates primitives', () => {
    let query = compileMongoQuery({_id: {$not: {$eq: 1}}});
    let results = data.filter(query);
    expect(results.length).to.equal(5);
    
    query = compileMongoQuery({_id: {$not: {$gt: 1}}});
    results = data.filter(query);
    expect(results.length).to.equal(1);
    
    query = compileMongoQuery({badges: {$not: {$all: ['orange']}}});
    results = data.filter(query);
    expect(results.length).to.equal(5);
  });
  
  it('negates $and operation', () => {
    let query = compileMongoQuery({favorites: {$not: {$and: {artist: 'Picasso', food: 'pizza'}}}});
    let results = data.filter(query);
    expect(results.length).to.equal(4);
  });
  
  it('negates $or operation', () => {
    let query = compileMongoQuery({'badges.0': {$not: {$or: [{$eq: 'black'}, {$eq: 'green'}]}}});
    let results = data.filter(query);
    expect(results.length).to.equal(3);
  });
  
  it('negates $nor operation', () => {
    let query = compileMongoQuery({favorites: {$not: {$nor: {artist: 'Cassatt', food: 'meringue'}}}});
    let results = data.filter(query);
    expect(results.length).to.equal(2);
  });
});
