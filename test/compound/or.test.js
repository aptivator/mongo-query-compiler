import {expect}            from 'chai';
import data                from '../_fixtures/data';
import {compileMongoQuery} from '../../src/mongo-query-compiler';

describe('$or', () => {
  it('performs explicit $or operation using object of queries', () => {
    let query = compileMongoQuery({favorites: {$or: {artist: 'Picasso', food: 'cake'}}});
    let results = data.filter(query);
    expect(results.length).to.equal(3);
  });
  
  it('performs explicit $or operaiton using array of queries', () => {
    let query = compileMongoQuery({favorites: {$or: [{artist: 'Picasso'}, {food: 'cake'}]}});
    let results = data.filter(query);
    expect(results.length).to.equal(3);
  });
  
  it('performs explict $or with query namespacing', () => {
    let query = compileMongoQuery({favorites: {$or: {artist: 'Picasso', '': {artist: 'Miro'}}}});
    let results = data.filter(query);
    expect(results.length).to.equal(3);
  });
});
