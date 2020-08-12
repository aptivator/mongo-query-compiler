import {operatorToNotPlusOrMap} from './_lib/vars';

export class LogicBlock {
  constructor(logicOperator = '$and') {
    let {not, or} = operatorToNotPlusOrMap[logicOperator];
    
    Object.assign(this, {
      conditions: [], 
      not, 
      operator: or ? '||' : '&&',
    });
  }
  
  add(condition) {
    this.conditions.push(condition);
  }
  
  group(logicOperator) {
    let logicBlock = new LogicBlock(logicOperator);
    this.add(logicBlock);
    return logicBlock;
  }
  
  return(wrapInIfStatement) {
    let {conditions, not, operator} = this;
    let block = [];
    
    for(let condition of conditions) {
      if(condition instanceof LogicBlock) {
        condition = condition.return();
      }
      
      block.push(condition);
    }
    
    block = '(' + block.join(operator) + ')';
    
    if(not) {
      block = '!' + block;
    }
    
    if(wrapInIfStatement) {
      block = `if(${block}) { return false; }`;
    }
    
    return block;
  }
}
