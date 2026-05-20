import {expect}            from 'chai';
import {compileMongoQuery} from '../../src/mongo-query-compiler';

describe('combined compound operators', () => {
  it('combines compound operators', () => {
    let query = compileMongoQuery({
      $and: {
        $or: {
          $in: {id: [1, 2, 3]},
          id: 6
        },
        finished: {
          $elemMatch: {
            $lt: 11
          }
        }
      }
    });
    let record = {id: 2, finished: [9, 10, 11]};
    let result = query(record);
    expect(result).to.be.true;
    record.id = 7;
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('performs negation on combined compound operators', () => {
    let query = compileMongoQuery({
      $not: {
        $and: {
          $or: [
            {id: {$in: [1, 2, 3]}},
            {id: 6}
          ],
          
          finished: {
            $elemMatch: {
              $lt: 11
            }
          }
        }
      }
    });
    let record = {id: 0, finished: [9, 10, 11]};
    let result = query(record);
    expect(result).to.be.true;
    record.id = 1;
    result = query(record);
    expect(result).to.be.false;
  });
});
