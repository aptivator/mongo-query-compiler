import {expect}            from 'chai';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$in', () => {
  it('checks to see if a referenced value is included in a specified array', () => {
    let query = compileMongoQuery({id: {$in: [5, 6]}});
    let record = {id: 5};
    let result = query(record);
    expect(result).to.be.true;
    record.id = 7;
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('allows reference path to be nested', () => {
    let query = compileMongoQuery({$in: {id: [5, 6]}});
    let record = {id: 5};
    let result = query(record);
    expect(result).to.be.true;
    record.id = 7;
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('can be perfromed on arrays', () => {
    let query = compileMongoQuery({badges: {$in: ['blue', 'green', 'yellow']}});
    let record = {badges: ['blue', 'green']};
    let result = query(record);
    expect(result).to.be.true;
    record.badges.push('red');
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('allows regular expressions as part of the $in array', () => {
    let query = compileMongoQuery({badges: {$in: [/^bla/, /^blu/]}});
    let record = {badges: ['blue']};
    let result = query(record);
    expect(result).to.be.true;
    record.badges.push('red');
    result = query(record);
    expect(result).to.be.false;
  });

  it('returns false when $in is empty', () => {
    let query = compileMongoQuery({id: {$in: []}});
    let record = {id: 10};
    let result = query(record);
    expect(result).to.be.false;
  });
});
