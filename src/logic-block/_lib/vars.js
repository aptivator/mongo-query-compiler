export const logicOperatorToNotAndOperator = {
  $or: {not: false, operator: '||'},
  $nor: {not: true, operator: '||'},
  $not: {not: true, operator: '&&'},
  $and: {not: false, operator: '&&'}
};
