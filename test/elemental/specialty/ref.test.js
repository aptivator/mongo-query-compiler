import {expect}            from 'chai';
import data                from '../../_fixtures/data';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$ref', () => {
  it('works in $eq', () => {
    let query = compileMongoQuery({favorites: {color: {$eq: {$ref: 'badges.0'}}}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('runs in $gt', () => {
    let query = compileMongoQuery({finished: {$lt: {$ref: 'age'}}});
    let results = data.filter(query);
    expect(results.length).to.equal(6);
  });
  
  it('works in $gte', () => {
    let query = compileMongoQuery({_id: {$gte: {$ref: 'type'}}});
    let results = data.filter(query);
    expect(results.length).to.equal(6);
  });
  
  it('performs in $in', () => {
    let query = compileMongoQuery({'points.bonus': {$in: {$ref: 'finished'}}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('operates in $all', () => {
    let query = compileMongoQuery({finished: {$all: {$ref: 'points.bonus'}}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
});
