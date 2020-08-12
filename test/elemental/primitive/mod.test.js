import {expect}            from 'chai';
import data                from '../../_fixtures/data';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$mod', () => {
  it('performs modulo operation', () => {
    let query = compileMongoQuery({$mod: {_id: [2, 0]}});
    let results = data.filter(query);
    expect(results.length).to.equal(3);
  });
});
