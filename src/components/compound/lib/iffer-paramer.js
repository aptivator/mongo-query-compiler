let negation = [null, true];

let opParamsMap = {
  $or:  [],
  $and: [null, false, true],
  $nor: negation,
  $not: negation
};

export default op => opParamsMap[op].slice();
