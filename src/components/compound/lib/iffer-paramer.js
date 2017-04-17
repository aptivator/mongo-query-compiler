let opParamsMap = {
  $or: [null, true, true],
  $nor: [null, false, true],
  $and: [null, true],
  $not: []
};

export default op => opParamsMap[op].slice();
