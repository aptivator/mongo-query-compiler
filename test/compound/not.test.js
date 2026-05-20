import {expect}            from 'chai';
import {compileMongoQuery} from '../../src/mongo-query-compiler';

describe('$not', () => {
  it('is equivalent to $ne', () => {
    let query = compileMongoQuery({id: {$not: 1}});
    let record = {id: 2};
    let result = query(record);
    expect(result).to.be.true;
    record.id = 1;
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('negates primitives', () => {
    let query = compileMongoQuery({id: {$not: {$eq: 1}}});
    let record = {id: 2}
    let result = query(record);
    expect(result).to.be.true;
    record.id = 1;
    result = query(record);
    expect(result).to.be.false;
    
    query = compileMongoQuery({id: {$not: {$gt: 1}}});
    result = query(record);
    expect(result).to.be.true;
    record.id = 2;
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('negates $and operation', () => {
    let query = compileMongoQuery({favorites: {$not: {$and: {artist: 'Picasso', food: 'pizza'}}}});
    let record = {favorites: {artist: 'Michelangelo', food: 'pizza'}}
    let result = query(record);
    expect(result).to.be.true;
    record.favorites.artist = 'Picasso';
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('negates $or operation', () => {
    let query = compileMongoQuery({'badges.0': {$not: {$or: [{$eq: 'black'}, {$eq: 'green'}]}}});
    let record = {badges: ['orange']};
    let result = query(record);
    expect(result).to.be.true;
    record.badges[0] = 'black';
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('negates $nor operation', () => {
    let query = compileMongoQuery({favorites: {$not: {$nor: {artist: 'Cassatt', food: 'meringue'}}}});
    let record = {favorites: {artist: 'Cassat', food: 'meringue'}};
    let result = query(record);
    expect(result).to.be.true;
    record.favorites.food = 'pasta';
    result = query(record);
    expect(result).to.be.false;
  });
});
