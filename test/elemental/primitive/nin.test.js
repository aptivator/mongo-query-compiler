import {expect}            from 'chai';
import data                from '../../_fixtures/data';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$nin', () => {
  it('checks to see if a referenced value is NOT included in a specified array', () => {
    let query = compileMongoQuery({_id: {$nin: [6]}});
    let results = data.filter(query);
    expect(results.length).to.equal(5);
  });
  /*
  it('allows reference path to be nested', () => {
    let query = compileMongoQuery({$nin: {_id: [6]}});
    let results = data.filter(query);
    expect(results.length).to.equal(5);
  });
  */
  it('can be perfromed on arrays', () => {
    let query = compileMongoQuery({badges: {$nin: ['orange']}});
    let results = data.filter(query);
    expect(results.length).to.equal(5);
  });
});
