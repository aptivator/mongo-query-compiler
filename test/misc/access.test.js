import {expect}            from 'chai';
import {compileMongoQuery} from '../../src/mongo-query-compiler';

describe('access of nested array documents', () => {
  it('supports dot notation', () => {
    let query = compileMongoQuery({'points.bonus': 10});
    let record = {points: {bonus: 10}};
    let result = query(record);
    expect(result).to.be.true;
  });
  
  it('supports sub-object notation', () => {
    let query = compileMongoQuery({points: {1: {bonus: {$eq: 10}}}});
    let record = {points: {1: {bonus: 10}}};
    let result = query(record);
    expect(result).to.be.true;
  });
  
  it('it "sees through" an array', () => {
    let query = compileMongoQuery({points: {points: 85}});
    let record = {points: [{points: 85}, {points: 86}]};
    let result = query(record);
    expect(result).to.be.true;
  });
});
