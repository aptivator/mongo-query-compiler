import {expect}            from 'chai';
import data                from '../../_fixtures/data';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$lte', () => {
  it('performs less than or equal comparison', () => {
    let query = compileMongoQuery({_id: {$lte: 3}});
    let results = data.filter(query);
    expect(results.length).to.equal(3);
  });
});
