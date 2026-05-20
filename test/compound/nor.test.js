import {expect}            from 'chai';
import {compileMongoQuery} from '../../src/mongo-query-compiler';

describe('$nor', () => {
  it('performs explicit $nor operation using object of queries', () => {
    let query = compileMongoQuery({favorites: {$nor: {artist: 'Noguchi', food: 'cake'}}});
    let record = {favorites: {artist: 'Mozart', food: 'ice cream'}};
    let result = query(record);
    expect(result).to.be.true;
    record.favorites.food = 'cake';
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('performs explicit $nor operaiton using array of queries', () => {
    let query = compileMongoQuery({favorites: {$nor: [{artist: 'Noguchi'}, {food: 'cake'}]}});
    let record = {favorites: {artist: 'Mozart', food: 'ice cream'}};
    let result = query(record);
    expect(result).to.be.true;
    record.favorites.food = 'cake';
    result = query(record);
    expect(result).to.be.false;
  });
});
