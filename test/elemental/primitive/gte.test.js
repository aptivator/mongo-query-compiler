import {expect}            from 'chai';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$gte', () => {
  it('performs greater than or equal comparison', () => {
    let query = compileMongoQuery({id: {$gte: 3}});
    let record = {id: 3};
    let result = query(record);
    expect(result).to.be.true;
    record.id = 2;
    result = query(record);
    expect(result).to.be.false;
  });
});
