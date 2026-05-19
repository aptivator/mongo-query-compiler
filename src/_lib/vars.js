import {operators} from '../evaluator/operators/operators';

export const operatorTypes = {
  elementals: new Set(Object.keys(operators)),
  ignoreds: new Set(['$comment', '$options']),
  logicals: new Set(['$or', '$and', '$nor', '$not']),
  objectAcceptors: new Set(['$eq', '$ne', '$elemMatch'])
};
