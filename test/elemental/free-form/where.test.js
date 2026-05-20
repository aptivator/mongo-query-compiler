import {expect}            from 'chai';
import {compileMongoQuery} from '../../../src/mongo-query-compiler';

describe('$where', () => {
  it('performs query using string format of $where', () => {
    let query = compileMongoQuery({$where: 'this.favorites.color === this.badges[0]'});
    let record = {favorites: {color: 'green'}, badges: ['green']};
    let result = query(record);
    expect(result).to.be.true;
    record.favorites.color = 'red';
    result = query(record);
    expect(result).to.be.false;
  });
  
  it('performs a query using a function format of $where', () => {
    let query = compileMongoQuery({
      $where(o, browser) {
        let color = browser(o, 'favorites.color');
        let badges = browser(o, 'badges');
        return color && badges.includes(color);
      }
    });
    let record = {favorites: {color: 'green'}, badges: ['green', 'blue']};
    let result = query(record);
    expect(result).to.be.true;
    record.favorites.color = 'red';
    result = query(record);
    expect(result).to.be.false;
  });
});
