import {expect}            from 'chai';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$gt', () => {
  it('performs greater than comparison', () => {
    let query = compileMongoQuery({id: {$gt: 3}});
    let record = {id: 4};
    let result = query(record);
    expect(result).to.be.true;
    record.id = 3;
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('unwinds operand object', () => {
    let query = compileMongoQuery({$gt: {id: 3}});
    let record = {id: 4};
    let result = query(record);
    expect(result).to.be.true;
  });
});
