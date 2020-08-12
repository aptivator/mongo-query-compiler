import {expect}            from 'chai';
import data                from '../_fixtures/data';
import {compileMongoQuery} from '../../src/mongo-query-compiler';

describe('$comment', () => {
  it('ignores the $comment operator', () => {
    let query = compileMongoQuery({
      $comment: 'Sample query',
      _id: 1
    });
    
    let results = data.filter(query);
    expect(results.length).to.equal(1);
    expect(query.toString().indexOf('$comment')).to.equal(-1);
  });
});
