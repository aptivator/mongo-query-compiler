import {expect}            from 'chai';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$lte', () => {
  it('performs less than or equal comparison', () => {
    let query = compileMongoQuery({id: {$lte: 3}});
    let record = {id: 3};
    let result = query(record);
    expect(result).to.be.true;
    record.id = 4;
    result = query(record);
    expect(result).to.be.false;
  });
});
