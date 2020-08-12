import {operators} from '../evaluator/operators/operators';

export const operatorTypes = {
  elementals: Object.keys(operators),
  ignoreds: ['$comment'],
  logicals: ['$or', '$and', '$nor', '$not'],
  objectAcceptors: ['$eq', '$ne', '$elemMatch']
};
