let {expect} = require('chai');
let data = require('../../data/data-big');
let compiler = require('../../../dist/compiler');

describe('$flatten', () => {
  it('flattens nested arrays', () => {
    let query = compiler({'store.employees.name': {first: /^J/}});
    let results = data.filter(query);
    expect(results.length).to.equal(0);
    
    query = compiler({store: {employees: {name: {first: {$eq: /^J/, $flatten: true}}}}});
    results = data.filter(query);
    expect(results.length).to.equal(1);
  });
});
