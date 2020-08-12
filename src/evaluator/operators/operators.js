import {arrayOperators}                     from './array-operators/array-operators';
import {freeFormOperators}                  from './free-form-operators/free-form-operators';
import {primitiveOperators}                 from './primitive-operators/primitive-operators';
import {addExistenceReferencePreprocessing} from './_lib/existence-reference-preprocessing-adder';

export const operators = {
  ...addExistenceReferencePreprocessing(arrayOperators),
  ...freeFormOperators,
  ...addExistenceReferencePreprocessing(primitiveOperators)
};
