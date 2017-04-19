let {expect} = require('chai');
let data = require('../../data/data');
let compiler = require('../../../dist/compiler');

describe('$comment', () => {
  it('ignores the $comment operator', () => {
    let query = compiler({
      $comment: 'Sample query',
      _id: 1
    });
    
    let results = data.filter(query);
    expect(results.length).to.equal(1);
    expect(query.toString().indexOf('$comment')).to.equal(-1);
  });
});
