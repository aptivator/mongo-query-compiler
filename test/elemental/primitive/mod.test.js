import {expect}            from 'chai';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$mod', () => {
  it('performs modulo operation', () => {
    let query = compileMongoQuery({$mod: {id: [2, 0]}});
    let record = {id: 16};
    let result = query(record);
    expect(result).to.be.true;
    record.id = 15;
    result = query(record);
    expect(result).to.be.false;
  });
});
