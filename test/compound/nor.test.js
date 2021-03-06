import {expect}            from 'chai';
import data                from '../_fixtures/data';
import {compileMongoQuery} from '../../src/mongo-query-compiler';


describe('$nor', () => {
  it('performs explicit $nor operation using object of queries', () => {
    let query = compileMongoQuery({favorites: {$nor: {artist: 'Noguchi', food: 'cake'}}});
    let results = data.filter(query);
    expect(results.length).to.equal(4);
  });
  
  it('performs explicit $nor operaiton using array of queries', () => {
    let query = compileMongoQuery({favorites: {$nor: [{artist: 'Noguchi'}, {food: 'cake'}]}});
    let results = data.filter(query);
    expect(results.length).to.equal(4);
  });
});
