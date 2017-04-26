let {expect} = require('chai');
let data = require('../../data/data');
let compiler = require('../../../dist/compiler');

describe('combined compound operators', () => {
  it('combines compound operators', () => {
    let query = compiler({
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
    let query = compiler({
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
