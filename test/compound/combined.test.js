import {expect}            from 'chai';
import data                from '../_fixtures/data';
import {compileMongoQuery} from '../../src/mongo-query-compiler';

describe('combined compound operators', () => {
  it('combines compound operators', () => {
    let query = compileMongoQuery({
      $and: {
        $or: {
          $in: {_id: [1, 2, 3]},
          _id: 6
        },

        finished: {
          $elemMatch: {
            $lt: 11
          }
        }
      }
    });
    
    let results = data.filter(query);
    expect(results.length).to.equal(2);
  });
  
  it('performs negation on combined compound operators', () => {
    let query = compileMongoQuery({
      $not: {
        $and: {
          $or: [
            {_id: {$in: [1, 2, 3]}},
            {_id: 6}
          ],
          
          finished: {
            $elemMatch: {
              $lt: 11
            }
          }
        }
      }
    });
    
    let results = data.filter(query);
    expect(results.length).to.equal(4);
  });
});
