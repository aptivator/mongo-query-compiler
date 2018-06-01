import _ from 'lodash';

export default class LogicBlock {
  constructor(condition, not, or) {
    _.extend(this, {conditions: [], not, or});
    if(condition) {
      this.add(condition);
    }
  }
  
  add(condition) {
    this.conditions.push({condition, operator: this.or ? '||' : '&&'});
  }
  
  return() {
    let {conditions, not} = this;
    let first = _.first(conditions);
    let block = '';

    delete first.operator;
    
    for(let conditionObj of conditions) {
      let {condition, operator} = conditionObj;
      if(condition instanceof LogicBlock) {
        condition = condition.return();
      }
      
      block += (operator || '') + condition;
    }
    
    if(not) {
      block = `!(${block})`;
    }
    
    return block;
  }
}
