import {expect}            from 'chai';
import data                from '../../_fixtures/data';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$ne', () => {
  it('performs inequality', () => {
    let query = compileMongoQuery({_id: {$ne: 1}});
    let results = data.filter(query);
    expect(results.length).to.equal(5);
  });  
  
  it('performs deep inequality', () => {
    let query = compileMongoQuery({favorites: {$ne: {artist: 'Picasso', food: 'pizza', color: 'black'}}});
    let results = data.filter(query);
    expect(results.length).to.equal(5);
  });
  
  it('shortcircuits evaluation for $ne and $nin if property does not exist', () => {
    let query = compileMongoQuery({dmitriy: {$ne: 1}});
    let results = data.filter(query);
    expect(results.length).to.equal(0);
  });
});
