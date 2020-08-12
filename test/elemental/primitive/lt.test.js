import {expect}            from 'chai';
import data                from '../../_fixtures/data';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$lt', () => {
  it('performs less than comparison', () => {
    let query = compileMongoQuery({_id: {$lt: 3}});
    let results = data.filter(query);
    expect(results.length).to.equal(2);
  });
});
