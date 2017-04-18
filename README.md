# mongo-query-compiler

### Introduction

This utility transpiles mongodb-like query objects into a JavaScript filtering 
functions.  The latter may then be used with any array's `.filter()` method to 
isolate the needed data subset.  The software was written to provide a more 
natural and declarative way to specify search criteria.  Given MongoDB's 
popularity, its query grammar was used as the basis for the syntax interpreted 
by this transpiler.  `mongo-query-compiler` is meant to be used in development
situations that require relatively complex filtering operations. For rudimentary
subsetting, [lodash](https://lodash.com/)'s `_.filter` method is recommended.

### Installation

```
npm install --save mongo-query-compiler
```

### Documentation and Examples

#### *Primitive Operators*

* **$exists** - assesses existence of an object element.  **Note:** object element
  existence is tested by checking if object keys include the assessed element's 
  name.

```javascript
import compiler from 'mongo-query-compiler';

let records = [
  {name: 'Dmitriy', age: 123},
  {name: 'Ivan', age: undefined},
  {name: 'Olga'}
];

let query = compiler({age: {$exists: true}});
let results = records.filter(query);
//results = [{name: 'Dmitriy', age: 123}, {name: 'Ivan', age: undefined}]
```

The above query `{age: {$exists: true}}` can also be declared by placing 
`$exists` keyword at the top.

```javascript
let query = compiler({$exists: {age: true}});
```

The following query specification may be advantageous if existence is assessed
for more than one object element.  If existence is checked for multiple elements
of a nested object, then `$exists` may be placed "in between" as illustrated
below.

```javascript
let records = [{
  name: 'Elena',
  favorite: {
    food: 'chocolate',
    music: 'trance'
  }
}];

let query = compiler({favorite: {$exists: {food: true, music: true}}});
let results = records.filter(query);
//results = [{name: 'Elena', ... }]
```
The above approach may be used with any primitive operator (*with some 
exceptions that will be noted appropriately*).

* **$mod** - performs modulo operation on an object element.  The operation's
  configuration is an array consisting of divisor and remainder (in that order).

```javascript
let records = [
  {name: 'Igor', yearBorn: 1960},
  {name: 'Vasiliy', yearBorn: 1981}
];

let query  = compiler({yearBorn: {$mod: [4, 0]}});
let results = records.filter(query);
//results = [{name: 'Igor', yearBorn: 1960}]
```

* **$regexp** - determines if an element fulfills a regular expression.

```javascript
let records = [
  {name: 'Igor'},
  {name: 'Vasiliy'}
];

let query = compiler({name: {$regexp: /iy$/i}});
let results = records.filter(query);
//results = [{name: 'Vasiliy'}]
```

* **$type** - checks if an assessed element is of a certain type.  **Note:** 
  `mongo-query-compiler` uses `lodash`'s `is` family of functions to determine
  types.  To specify a type simply list a name of one of the `is` functions 
  without the `is`.  For example, `lodash` has `isNumber`, `isInteger`, and 
  `isString` methods.  The types that these support are `number`, `integer`, and
  `string`, respectively.

```javascript
let records = [
  {name: 'Vladimir', age: 55, married: true},
  {name: 'Natalya', age: 45, married: 'no'}
];

let query = compiler({married: {$type: 'boolean'}});
let results = records.filter(query);
//results = [{name: 'Vladimir', age: 55, married: true}]
```

#### *Primitive Operators (that support $ref property)*

#### *Array Operators*

#### *Free-form Operators*

#### *Compound Operators*

#### *Utility Operators*

### Limitations
