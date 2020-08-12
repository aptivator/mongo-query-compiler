import {expect}            from 'chai';
import data                from '../../_fixtures/data';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$gt', () => {
  it('performs greater than comparison', () => {
    let query = compileMongoQuery({_id: {$gt: 3}});
    let results = data.filter(query);
    expect(results.length).to.equal(3);
  });
  
  it('unwinds operand object', () => {
    let query = compileMongoQuery({$gt: {_id: 3}});
    let results = data.filter(query);
    expect(results.length).to.equal(3);    
  });
});
