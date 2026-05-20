import {expect}            from 'chai';
import {compileMongoQuery} from '../../src/mongo-query-compiler';

describe('$flatten', () => {
  it('flattens nested arrays', () => {
    let query = compileMongoQuery({'store.employees.name': {first: /^X/}});
    let record = {store: [{id: 2, employees: [{name: {first: 'Xavier'}}]}]};
    let result = query(record);
    expect(result).to.be.false;
    query = compileMongoQuery({'store.employees.name': {first: /^X/, $flatten: true}});
    result = query(record);
    expect(result).to.be.true;
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
                    $eq: /^x/i
                  }
                }
              }
            }
          }
        }
      }
    });

    let record = {store: [{id: 2, employees: [{name: {first: 'Xavier'}}]}]};
    let result = query(record);
    expect(result).to.be.true;
  });
  
  it('works with $ref', () => {
    let query = compileMongoQuery({'tags.2': {$in: {$ref: 'store.employees.name.first', $flatten: true}}});
    let record = {store: [{id: 2, employees: [{name: {first: 'Xavier'}}]}], tags: ['Jack', 'John', 'Xavier']};
    let result = query(record);
    expect(result).to.be.true;
  });
});
