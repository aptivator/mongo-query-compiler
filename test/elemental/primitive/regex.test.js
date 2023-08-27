import {expect}            from 'chai';
import data                from '../../_fixtures/data';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$regex', () => {
  it('aliases $regexp', () => {
    let query = compileMongoQuery({$regex: {name: /^x/}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });

  it('supports $options also', () => {
    let query = compileMongoQuery({name: {$regex: '^x', $options: 'i'}});
    let results = data.filter(query);
    expect(results.length).to.equal(2);
  });
});
