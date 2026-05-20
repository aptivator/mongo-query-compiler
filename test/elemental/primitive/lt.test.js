import {expect}            from 'chai';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$lt', () => {
  it('performs less than comparison', () => {
    let query = compileMongoQuery({id: {$lt: 3}});
    let record = {id: 2};
    let result = query(record);
    expect(result).to.be.true;
    record.id = 3;
    result = query(record);
    expect(result).to.be.false;
  });
});
