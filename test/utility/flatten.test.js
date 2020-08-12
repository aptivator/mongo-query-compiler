import {expect}            from 'chai';
import data                from '../_fixtures/data-big';
import {compileMongoQuery} from '../../src/mongo-query-compiler';

describe('$flatten', () => {
  it('flattens nested arrays', () => {
    let query = compileMongoQuery({'store.employees.name': {first: /^J/}});
    let results = data.filter(query);
    expect(results.length).to.equal(0);
    
    query = compileMongoQuery({store: {employees: {name: {first: {$eq: /^J/, $flatten: true}}}}});
    results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('can be placed anywhere in the query', () => {
    let query = compileMongoQuery({
      $flatten: true,
      store: {
        employees: {
          name: {
            $and: {
              first: {
                $and: {
                  $or: {
                    $eq: /^j/i
                  }
                }
              }
            }
          }
        }
      }
    });
    
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('works with $ref', () => {
    let query = compileMongoQuery({'tags.2': {$in: {$ref: 'store.employees.name.first', $flatten: true}}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
});
