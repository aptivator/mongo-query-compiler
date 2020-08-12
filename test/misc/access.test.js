import {expect}            from 'chai';
import data                from '../_fixtures/data';
import {compileMongoQuery} from '../../src/mongo-query-compiler';

describe('access of nested array documents', () => {
  it('supports dot notation', () => {
    let query = compileMongoQuery({'points.bonus': 10});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('supports sub-object notation', () => {
    let query = compileMongoQuery({
      points: {
        1: {
          bonus: {
            $eq: 10
          }
        }
      }
    });
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('it "sees through" an array', () => {
    let query = compileMongoQuery({points: {points: 85}});
    let results = data.filter(query);
    expect(results.length).to.equal(2);
  });
});
