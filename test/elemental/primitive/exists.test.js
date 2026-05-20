import {expect}            from 'chai';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$exists', () => {
  it('determines if a value exists', () => {
    let query = compileMongoQuery({favorites: {$exists: {color: true, food: true}}});
    let record = {favorites: {color: 'green', food: 'pizza'}};
    let result = query(record);
    expect(result).to.be.true;
    delete record.favorites.food;
    result = query(record);
    expect(result).to.be.false;
  });
});
