import {expect}            from 'chai';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$regexp', () => {
  it('performs regular expression test', () => {
    let query = compileMongoQuery({$regexp: {name: /^x/}});
    let record = {name: 'xavier'};
    let result = query(record);
    expect(result).to.be.true;
    record.name = 'Xavier';
    result = query(record);
    expect(result).to.be.false;
  });

  it('converts string regexp to RegExp object', () => {
    let query = compileMongoQuery({$regexp: {name: '^x'}});
    let record = {name: 'xavier'};
    let result = query(record);
    expect(result).to.be.true;
    record.name = 'Xavier';
    result = query(record);
    expect(result).to.be.false;
  });

  it('supports $options only when string regexp is employed', () => {
    let query = compileMongoQuery({$regexp: {name: '^x'}, $options: 'i'});
    let record = {name: 'Xavier'};
    let result = query(record);
    expect(result).to.be.true;
  });

  it('requires that whenever $options is used, it is on the same level as $regexp', () => {
    let query = compileMongoQuery({$regexp: {name: '^x', $options: 'i'}});
    let record = {name: 'Xavier'};
    let result = query(record);
    expect(result).to.be.false;
  });
});
