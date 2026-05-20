import {expect}            from 'chai';
import {compileMongoQuery} from '../../src/mongo-query-compiler';

describe('$comment', () => {
  it('ignores the $comment operator', () => {
    let query = compileMongoQuery({$comment: 'Sample query', id: 1});
    let record = {id: 1};
    let result = query(record);
    expect(result).to.be.true;
  });
});
