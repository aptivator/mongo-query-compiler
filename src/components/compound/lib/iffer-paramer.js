let negation = ['', true];

let opParamsMap = {
  $or:  [],
  $nor: negation,
  $and: ['', false, true],
  $not: negation
};

export default op => opParamsMap[op].slice();
