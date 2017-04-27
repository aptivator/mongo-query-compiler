let {expect} = require('chai');
let compiler = require('../../../dist/compiler');

describe('documentation tests', () => {
  it('test', () => {
    let records = [{ 
      item: {
        type: 'book',
        description: {
          short: 'Some book'
        }
      },
      reviews: undefined,
      tags: ['book', 'technical'],
      store: [{
        number: '222', 
        qty: 51,
        region: 'NE',
        employees: [{
          name: {
            first: 'John',
            last: 'Doe'
          },
          age: 22
        }, {
          name: {
            first: 'Jack',
            last: 'Smith'
          },
          age: 27
        }]
      }, { 
        number: '212', 
        qty: 11,
        employees: [{
          name: {
            first: 'Kate',
            last: 'Jones'
          }
        }]
      }] 
    }];
    
    let query = compiler({'store.employees.name': {first: {$eq: /^J/}}});
    console.log(query.toString());
    let results = records.filter(query);
    console.log(results);
  });
});
