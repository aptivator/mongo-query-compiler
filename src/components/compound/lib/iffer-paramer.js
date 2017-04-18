let negation = [null, true];

let opParamsMap = {
  $or:  [],
  $nor: negation,
  $not: negation,
  $and: [null, false, true]
};

export default op => opParamsMap[op].slice();
