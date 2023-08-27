export const comparators = {
  gt(value, testValue) {
    return value > testValue;
  },

  gte(value, testValue) {
    return value >= testValue;
  },

  lt(value, testValue) {
    return value < testValue;
  },

  lte(value, testValue) {
    return value <= testValue;
  }
};
