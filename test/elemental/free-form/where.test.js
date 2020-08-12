import {expect}            from 'chai';
import data                from '../../_fixtures/data';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$where', () => {
  it('performs query using string format of $where', () => {
    let query = compileMongoQuery({$where: 'this.favorites.color === this.badges[0]'});
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
  
  it('performs a query using a function format of $where', () => {
    let query = {
      $where(o, browser) {
        let color = browser(o, 'favorites.color');
        let badges = browser(o, 'badges');
        
        if(color && badges.includes(color)) {
          return true;
        }
      }
    };
    
    query = compileMongoQuery(query);
    let results = data.filter(query);
    expect(results.length).to.equal(1);
  });
});
