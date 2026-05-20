import {evaluate}   from './evaluator/evaluator';
import {LogicBlock} from './logic-block/logic-block';
import {expression} from './parser/parser';

export function compileMongoQuery(query) {
  let symbolTable = {};
  let params = {operand: query, symbolTable, logicBlock: new LogicBlock};
  let logicBlock = expression(params);
  let code = 'return ' + logicBlock.return();
  let filterer = new Function('o', 'symbolTable', 'evaluate', code);

  return function(o) {
    return filterer(o, symbolTable, evaluate);  
  }
}
