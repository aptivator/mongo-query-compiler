import {expect}            from 'chai';
import data                from '../../_fixtures/data';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$size', () => {
  it(`selects documents based on the size of some array`, () => {
    let query = compileMongoQuery({$size: {badges: 1}});
    let results = data.filter(query);
    expect(results.length).to.equal(2);
  });
  
  it('converts an accessed non-array value to an array', () => {
    let query = compileMongoQuery({age: {$size: 1}});
    let results = data.filter(query);
    expect(results.length).to.equal(6);
  });
});
