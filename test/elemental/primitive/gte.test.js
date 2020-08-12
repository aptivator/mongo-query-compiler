import {expect}            from 'chai';
import data                from '../../_fixtures/data';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$gte', () => {
  it('performs greater than or equal comparison', () => {
    let query = compileMongoQuery({_id: {$gte: 3}});
    let results = data.filter(query);
    expect(results.length).to.equal(4);
  });
});
