import {expect}            from 'chai';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$ref', () => {
  it('works in $eq', () => {
    let query = compileMongoQuery({favorites: {color: {$eq: {$ref: 'badges.0'}}}});
    let record = {favorites: {color: 'green'}, badges: ['green']};
    let result = query(record);
    expect(result).to.be.true;
    record.favorites.color = 'red';
    result = query(result);
    expect(result).to.be.false;
  });
  
  it('runs in $gt', () => {
    let query = compileMongoQuery({finished: {$lt: {$ref: 'age'}}});
    let record = {finished: 22, age: 33};
    let result = query(record);
    expect(result).to.be.true;
    record.age = 22;
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('performs in $in', () => {
    let query = compileMongoQuery({'points.bonus': {$in: {$ref: 'finished'}}});
    let record = {points: {bonus: 22}, finished: [21, 22]};
    let result = query(record);
    expect(result).to.be.true;
    record.points.bonus = 24;
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('operates in $all', () => {
    let query = compileMongoQuery({finished: {$all: {$ref: 'points.bonus'}}});
    let record = {finished: [1, 2, 3, 4], points: {bonus: [3, 4]}};
    let result = query(record);
    expect(result).to.be.true;
    record.points.bonus = [5, 6];
    result = query(record);
    expect(result).to.be.false;
  });
});
