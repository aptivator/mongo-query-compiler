export const operatorToNotPlusOrMap = {
  $or: {not: false, or: false},
  $nor: {not: true, or: false},
  $not: {not: true, or: false},
  $and: {not: false, or: true}
};
