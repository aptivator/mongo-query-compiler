import {expect}            from 'chai';
import data                from '../../_fixtures/data';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$elemMatch', () => {
  it(`performs a nested query on an array of primitives`, () => {
    let query = compileMongoQuery({finished: {$elemMatch: {$gte: 17}}});
    let results = data.filter(query);
    expect(results.length).to.equal(3);
  });
  
  it('performs a nested query on an array of documents', () => {
    let query = compileMongoQuery({points: {$elemMatch: {points: {$lt: 55}}}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('converts an accessed non-array value to an array', () => {
    let query = compileMongoQuery({age: {$elemMatch: {$eq: 19}}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
});
