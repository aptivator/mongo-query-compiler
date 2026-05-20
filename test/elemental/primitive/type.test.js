import {expect}            from 'chai';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$type', () => {
  it(`performs type assessment using lodash's is functions`, () => {
    let query = compileMongoQuery({id: {$type: 'integer'}, $type: {name: 'string'}});
    let record = {id: 2, name: 'Xavier'};
    let result = query(record);
    expect(result).to.be.true;
    record = {id: 2.5, name: true};
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('throws an error when an invalid lodash type is specified', () => {
    let query = compileMongoQuery({id: {$type: 'biginteger'}});
    let record = {id: 22};
    expect(() => query(record)).to.throw();
  });
});
