let {expect} = require('chai');
let data = require('../../../fixtures/data');
let compiler = require('../../../../dist/compiler');

describe('ne', () => {
  it('performs not-equal check', () => {
    let query = compiler({favorites: {color: {$and: {$ne: 'white', $exists: true}}}});
    let results = data.filter(query);
    console.log(results.length);
  });  
});
