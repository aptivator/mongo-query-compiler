import {expect}            from 'chai';
import data                from '../../_fixtures/data';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$exists', () => {
  it('determines if a value exists', () => {
    let query = compileMongoQuery({favorites: {$exists: {color: true, food: true}}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
});
