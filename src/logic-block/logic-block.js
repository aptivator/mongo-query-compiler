import {logicOperatorToNotAndOperator} from './_lib/vars';

export class LogicBlock {
  constructor(logicOperator = '$and') {
    let notAndOperator = logicOperatorToNotAndOperator[logicOperator];
    Object.assign(this, notAndOperator);
    this.conditions = [];
  }
  
  add(condition) {
    this.conditions.push(condition);
  }
  
  group(logicOperator) {
    let logicBlock = new LogicBlock(logicOperator);
    this.add(logicBlock);
    return logicBlock;
  }
  
  return() {
    let {conditions, not, operator} = this;
    let block = [];
    
    for(let condition of conditions) {
      if(condition instanceof LogicBlock) {
        condition = condition.return();
      }
      
      block.push(condition);
    }
    
    if(block.length === 1) {
      block = block[0];
    } else {
      block = '(' + block.join(operator) + ')';
    }

    if(not) {
      block = '!' + block;
    }
    
    return block;
  }
}
