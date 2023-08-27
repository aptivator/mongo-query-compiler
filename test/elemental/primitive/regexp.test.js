import {expect}            from 'chai';
import data                from '../../_fixtures/data';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$regexp', () => {
  it('performs regular expression test', () => {
    let query = compileMongoQuery({$regexp: {name: /^x/}});
    let results = data.filter(query);
    expect(results.length).to.equal(2);
  });

  it('converts string regexp to RegExp object', () => {
    let query = compileMongoQuery({$regexp: {name: '^x'}});
    let results = data.filter(query);
    expect(results.length).to.equal(2);
  });
});
