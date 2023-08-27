import {expect}            from 'chai';
import data                from '../../_fixtures/data';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$regexp', () => {
  it('performs regular expression test', () => {
    let query = compileMongoQuery({$regexp: {name: /^x/}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });

  it('converts string regexp to RegExp object', () => {
    let query = compileMongoQuery({$regexp: {name: '^x'}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });

  it('supports $options only when string regexp is employed', () => {
    let query = compileMongoQuery({$regexp: {name: '^x'}, $options: 'i'});
    let results = data.filter(query);
    expect(results.length).to.equal(2);
  });

  it('requires that whenever $options is used, it is on the same level as $regexp', () => {
    let query = compileMongoQuery({name: {$regexp: '^x', $options: 'i'}});
    let results = data.filter(query);
    expect(results.length).to.equal(2);
  });

  it('will return incorrect results if $options is not on the same level as $regexp', () => {
    let query = compileMongoQuery({$regexp: {name: '^x', $options: 'i'}});
    let results = data.filter(query);
    expect(results).to.eql([]);
  }); 
});
