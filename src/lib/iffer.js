import _          from 'lodash';
import LogicBlock from './logic-block';

export default class Iffer {
  constructor(...args) {
    _.extend(this, {blocks: []});
    this.start(...args);
  }
  
  start(condition, not, or) {
    let current = new LogicBlock(condition, not, or);
    
    if(this.current) {
      this.add(current);
    }
    
    this.blocks.push(current);
    return _.extend(this, {current});
  }
  
  add(condition) {
    this.current.add(condition);
    return this;
  }

  group(condition, not, or) {
    return this.start(condition, not, or);
  }
  
  groupClose() {
    let {blocks} = this;
    
    if(!blocks.length) {
      return;
    }
    
    blocks.pop();
    let current = _.last(blocks);
    return _.extend(this, {current});
  }
  
  return(writer) {
    if(this.blocks.length > 1) {
      throw new Error('some groups were not closed');
    }
    
    let code = this.current.return();
    code = `if(${code})`;
    code += `{return false;}`;
    
    return writer ? writer(code) : code;
  }
}
