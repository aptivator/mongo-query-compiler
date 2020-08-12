import {expect}            from 'chai';
import {compileMongoQuery} from '../../src/mongo-query-compiler';

describe('array of primitives', () => {
  it('searches an array of primitives', () => {
    let scores = [1, 2, 3, 4, 5, 6];
    let query = compileMongoQuery({$gt: 2, $mod: [2, 0]});
    let results = scores.filter(query);
    expect(results.length).to.equal(2);
  });
});
