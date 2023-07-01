import {expect}            from 'chai';
import data                from '../../_fixtures/data';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$in', () => {
  it('checks to see if a referenced value is included in a specified array', () => {
    let query = compileMongoQuery({_id: {$in: [6]}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('allows reference path to be nested', () => {
    let query = compileMongoQuery({$in: {_id: [6]}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('can be perfromed on arrays', () => {
    let query = compileMongoQuery({badges: {$in: ['orange']}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('allows regular expressions as part of the $in array', () => {
    let query = compileMongoQuery({badges: {$in: [/^bla/, /^blu/]}});
    let results = data.filter(query);
    expect(results.length).to.equal(2);
  });

  it('returns an empty array when $in is empty', () => {
    let query = compileMongoQuery({_id: {$in: []}});
    let results = data.filter(query);
    expect(results).to.eql([]);
  });
});
