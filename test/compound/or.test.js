import {expect}            from 'chai';
import {compileMongoQuery} from '../../src/mongo-query-compiler';

describe('$or', () => {
  it('performs explicit $or operation using object of queries', () => {
    let query = compileMongoQuery({favorites: {$or: {artist: 'Picasso', food: 'cake'}}});
    let record = {favorites: {artist: 'Da Vinci', food: 'cake'}};
    let result = query(record);
    expect(result).to.be.true;
    record.favorites.food = 'pasta';
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('performs explicit $or operation using array of queries', () => {
    let query = compileMongoQuery({favorites: {$or: [{artist: 'Picasso'}, {food: 'cake'}]}});
    let record = {favorites: {artist: 'Da Vinci', food: 'cake'}};
    let result = query(record);
    expect(result).to.be.true;
    record.favorites.food = 'pasta';
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('performs explict $or with query namespacing', () => {
    let query = compileMongoQuery({favorites: {$or: {artist: 'Picasso', '': {artist: 'Miro'}}}});
    let record = {favorites: {artist: 'Miro', food: 'cake'}};
    let result = query(record);
    expect(result).to.be.true;
    record.favorites.artist = 'Da Vinci';
    result = query(record);
    expect(result).to.be.false;
  });
});
