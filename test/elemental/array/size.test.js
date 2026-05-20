import {expect}            from 'chai';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$size', () => {
  it(`selects documents based on the size of some array`, () => {
    let query = compileMongoQuery({$size: {badges: 1}});
    let record = {badges: ['orange']};
    let result = query(record);
    expect(result).to.be.true;
    record.badges = ['blue', 'green'];
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('converts an accessed non-array value to an array', () => {
    let query = compileMongoQuery({age: {$size: 1}});
    let record = {age: 2}
    let result = query(record);
    expect(result).to.be.true;
  });
});
