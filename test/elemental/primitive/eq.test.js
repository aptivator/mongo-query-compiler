import {expect}            from 'chai';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$eq', () => {
  it('performs colon equality', () => {
    let query = compileMongoQuery({id: 1});
    let record = {id: 1};
    let result = query(record);
    expect(result).to.be.true;
    record.id = 2;
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('allows colon equality with compound property access', () => {
    let query = compileMongoQuery({'favorites.food': 'pizza'});
    let record = {favorites: {food: 'pizza'}};
    let result = query(record);
    expect(result).to.be.true;
    record.favorites.food = 'pasta';
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('augments nested access paths', () => {
    let query = compileMongoQuery({favorites: {food: 'pizza'}});
    let record = {favorites: {food: 'pizza'}};
    let result = query(record);
    expect(result).to.be.true;
  });
  
  it('allows nested $eq operator', () => {
    let query = compileMongoQuery({id: {$eq: 1}});
    let record = {id: 1};
    let result = query(record);
    expect(result).to.be.true;
    record.id = 2;
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('allows nested property access key', () => {
    let query = compileMongoQuery({'favorites.food': {$eq: 'pizza'}});
    let record = {favorites: {food: 'pizza'}};
    let result = query(record);
    expect(result).to.be.true;
  });
  
  it('performs deep equality if object follows $eq', () => {
    let query = compileMongoQuery({favorites: {$eq: {artist: 'Picasso', food: 'pizza'}}});
    let record = {favorites: {artist: 'Picasso', food: 'pizza'}};
    let result = query(record);
    expect(result).to.be.true;
    record.favorites.sport = 'football';
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('perfroms equality when one operand is an array', () => {
    let query = compileMongoQuery({favorites: {color: {$eq: ['black', 'blue']}}});
    let record = {favorites: {color: ['black', 'blue']}};
    let result = query(record);
    expect(result).to.be.true;
    record.favorites.color.push('green');
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('performs regular expression equality', () => {
    let query = compileMongoQuery({name: /^s/i});
    let record = {name: 'Susie'};
    let result = query(record);
    expect(result).to.be.true;
    record.name = 'Annie';
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('conducts implicit deep array equality', () => {
    let query = compileMongoQuery({finished: [17, 3]});
    let record = {finished: [17, 3]};
    let result = query(record);
    expect(result).to.be.true;
  });
});
