import {expect}            from 'chai';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$all', () => {
  it(`selects documents based on arrays that include all the listed values`, () => {
    let query = compileMongoQuery({badges: {$all: ['blue', 'green']}});
    let record = {badges: ['blue', 'green', 'yellow']}
    let result = query(record);
    expect(result).to.be.true;
    record.badges = ['blue'];
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('converts non-array values and options into arrays', () => {
    let query = compileMongoQuery({id: {$all: 1}});
    let record = {id: 1};
    let result = query(record);
    expect(result).to.be.true;
    record.id = [1];
    result = query(record);
    expect(result).to.be.true;
    record.id = [2];
    result = query(record);
    expect(result).to.be.false;
  });
});
