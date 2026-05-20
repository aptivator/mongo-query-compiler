import {expect}            from 'chai';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$ne', () => {
  it('performs inequality', () => {
    let query = compileMongoQuery({id: {$ne: 1}});
    let record = {id: 5};
    let result = query(record);
    expect(result).to.be.true;
    record.id = 1;
    result = query(record);
    expect(result).to.be.false;
  });

  it('performs deep inequality', () => {
    let query = compileMongoQuery({favorites: {$ne: {artist: 'Picasso', food: 'pizza', color: 'black'}}});
    let record = {favorites: {artist: 'Picasso', food: 'pizza', color: 'blue'}}
    let result = query(record);
    expect(result).to.be.true;
    record.favorites.color = 'black';
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('shortcircuits evaluation for $ne and $nin if property does not exist', () => {
    let query = compileMongoQuery({dmitriy: {$ne: 1}});
    let record = {id: 2};
    let result = query(record);
    expect(result).to.be.false;
  });
});
