import {expect}            from 'chai';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$elemMatch', () => {
  it(`performs a nested query on an array of primitives`, () => {
    let query = compileMongoQuery({finished: {$elemMatch: {$gte: 17}}});
    let record = {finished: [16, 17]};
    let result = query(record);
    expect(result).to.be.true;
    record.finished = [11, 12];
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('performs a nested query on an array of documents', () => {
    let query = compileMongoQuery({points: {$elemMatch: {points: {$lt: 55}}}});
    let record = {points: {points: [11, 12]}};
    let result = query(record);
    expect(result).to.be.true;
    record.points.points = [55, 56];
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('converts an accessed non-array value to an array', () => {
    let query = compileMongoQuery({age: {$elemMatch: {$eq: 19}}});
    let record = {age: 19};
    let result = query(record);
    expect(result).to.be.true;
    record.age = 18;
    result = query(record);
    expect(result).to.be.false;
  });
});
