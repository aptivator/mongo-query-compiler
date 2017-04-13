let base = [null, false, false];

let opParamsMap = {
  $or: [null, true, true],
  $nor: [null, false, true],
  $and: base,
  $not: base
};

export default op => opParamsMap[op].slice();
