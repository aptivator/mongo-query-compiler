import {expect}            from 'chai';
import data                from '../../_fixtures/data';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$all', () => {
  it(`selects documents based on arrays that include all the listed values`, () => {
    let query = compileMongoQuery({badges: {$all: ['blue']}});
    let results = data.filter(query);
    expect(results.length).to.equal(3);
  });
  
  it('converts non-array values and options into arrays', () => {
    let query = compileMongoQuery({_id: {$all: 1}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
});
