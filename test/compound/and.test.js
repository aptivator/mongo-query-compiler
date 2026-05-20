import {expect}            from 'chai';
import {compileMongoQuery} from '../../src/mongo-query-compiler';

describe('$and', () => {
  it('performs implicit $and operation', () => {
    let query = compileMongoQuery({id: 1, name: /^s/});
    let record = {id: 1, name: 'sam'}
    let result = query(record);
    expect(result).to.be.true;
    result = query(Object.assign(record, {id: 2}));
    expect(result).to.be.false;
  });
  
  it('performs explicit $and operation using object of queries', () => {
    let query = compileMongoQuery({favorites: {$and: {artist: 'Picasso', food: 'pizza'}}});
    let record = {favorites: {artist: 'Picasso', food: 'pizza'}};
    let result = query(record);
    expect(result).to.be.true;
    record.favorites.food = 'pasta';
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('performs explicit $and operation using array of queries', () => {
    let query = compileMongoQuery({favorites: {$and: [{artist: 'Picasso'}, {food: 'pizza'}]}});
    let record = {favorites: {artist: 'Picasso', food: 'pizza'}};
    let result = query(record);
    expect(result).to.be.true;
    record.favorites.artist = 'Da Vinci';
    result = query(record);
    expect(result).to.be.false;
  });
});
