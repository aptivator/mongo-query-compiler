import {expect}            from 'chai';
import data                from '../_fixtures/data';
import {compileMongoQuery} from '../../src/mongo-query-compiler';

describe('$and', () => {
  it('performs implicit $and operation', () => {
    let query = compileMongoQuery({_id: 1, name: /^s/});
    let results = data.filter(query);

    expect(results.length).to.equal(1);
    expect(results[0].name).to.equal('sue');
  });
  
  it('performs explicit $and operation using object of queries', () => {
    let query = compileMongoQuery({favorites: {$and: {artist: 'Picasso', food: 'pizza'}}});
    let results = data.filter(query);
    let expectedObject = {artist: 'Picasso', food: 'pizza'};
    
    expect(results.length).to.equal(2);
    results.forEach(result => expect(result.favorites).to.include(expectedObject));
  });
  
  it('performs explicit $and operation using array of queries', () => {
    let query = compileMongoQuery({favorites: {$and: [{artist: 'Picasso'}, {food: 'pizza'}]}});
    let results = data.filter(query);
    let expectedObject = {artist: 'Picasso', food: 'pizza'};
    
    expect(results.length).to.equal(2);
    results.forEach(result => expect(result.favorites).to.include(expectedObject));
  });
});
