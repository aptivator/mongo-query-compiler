module.exports = [{ 
  item: {
    type: 'book',
    description: {
      short: 'Some book'
    }
  },
  reviews: undefined,
  tags: ['book', 'technical', 'John'],
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
