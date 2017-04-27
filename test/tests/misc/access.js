let {expect} = require('chai');
let data = require('../../data/data');
let compiler = require('../../../dist/compiler');

describe('access of nested array documents', () => {
  it('supports dot notation', () => {
    let query = compiler({'points.bonus': 10});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('supports sub-object notation', () => {
    let query = compiler({
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
    let query = compiler({points: {points: 85}});
    let results = data.filter(query);
    expect(results.length).to.equal(2);
  });
});
