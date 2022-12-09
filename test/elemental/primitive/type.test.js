import {expect}            from 'chai';
import data                from '../../_fixtures/data';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$type', () => {
  it(`performs type assessment using lodash's is functions`, () => {
    let query = compileMongoQuery({_id: {$type: 'integer'}, $type: {name: 'string'}});
    let results = data.filter(query);
    expect(results.length).to.equal(6);
  });
  
  it('throws an error when an invalid lodash type is specified', () => {
    let query = compileMongoQuery({_id: {$type: 'biginteger'}});
    expect(() => data.filter(query)).to.throw();
  });
});
