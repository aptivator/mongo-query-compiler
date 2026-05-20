import {expect}            from 'chai';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$nin', () => {
  it('checks to see if a referenced value is NOT included in a specified array', () => {
    let query = compileMongoQuery({id: {$nin: [5, 6]}});
    let record = {id: 7};
    let result = query(record);
    expect(result).to.be.true;
    record.id = 5;
    result = query(record);
    expect(result).to.be.false;
  });

  it('allows reference path to be nested', () => {
    let query = compileMongoQuery({$nin: {id: [5, 6]}});
    let record = {id: 7};
    let result = query(record);
    expect(result).to.be.true;
    record.id = 5;
    result = query(record);
    expect(result).to.be.false;
  });

  it('can be perfromed on arrays', () => {
    let query = compileMongoQuery({badges: {$nin: ['orange', 'yellow', 'black']}});
    let record = {badges: ['orange', 'red']};
    let result = query(record);
    expect(result).to.be.true;
    record.badges = ['yellow', 'black'];
    result = query(record);
    expect(result).to.be.false;
  });
});
