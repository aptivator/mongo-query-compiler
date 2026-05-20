import {expect}            from 'chai';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$regex', () => {
  it('aliases $regexp', () => {
    let query = compileMongoQuery({$regex: {name: /^x/}});
    let record = {name: 'xavier'};
    let result = query(record);
    expect(result).to.be.true;
    record.name = 'Xavier';
    result = query(record);
    expect(result).to.be.false;
  });

  it('supports $options also', () => {
    let query = compileMongoQuery({name: {$regex: '^x', $options: 'i'}});
    let record = {name: 'Xavier'};
    let result = query(record);
    expect(result).to.be.true;
  });
});
