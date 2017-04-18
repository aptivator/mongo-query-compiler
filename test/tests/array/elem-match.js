let {expect} = require('chai');
let data = require('../../data/data');
let compiler = require('../../../dist/compiler');

describe('$elemMatch', () => {
  it(`performs a nested query on an array of primitives`, () => {
    let query = compiler({finished: {$elemMatch: {$gte: 17}}});
    let results = data.filter(query);
    expect(results.length).to.equal(3);
  });
  
  it('performs a nested query on an array of documents', () => {
    let query = compiler({points: {$elemMatch: {points: {$lt: 55}}}});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
});
