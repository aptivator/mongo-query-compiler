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

##### $exists
  
Assesses existence of an object element.  **Note:** object element existence is 
tested by checking if object keys include the assessed element's name.

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

##### $mod

Performs modulo operation on an object element.  The operation's configuration 
is an array consisting of divisor and remainder (in that order).

```javascript
let records = [
  {name: 'Igor', yearBorn: 1960},
  {name: 'Vasiliy', yearBorn: 1981}
];

let query  = compiler({yearBorn: {$mod: [4, 0]}});
let results = records.filter(query);
//results = [{name: 'Igor', yearBorn: 1960}]
```

##### $regexp

Determines if an element fulfills a regular expression.

```javascript
let records = [
  {name: 'Igor'},
  {name: 'Vasiliy'}
];

let query = compiler({name: {$regexp: /iy$/i}});
let results = records.filter(query);
//results = [{name: 'Vasiliy'}]
```

##### $type

Checks if an assessed element is of a certain type.  **Note:** 
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

##### Implicit equality

Determines equality of an object element against a primitive value, a regular
expression, or an array.  To test object element's (deep) equality against some 
object, use `$eq` operator.

```javascript
let records = [{
  name: 'Elena',
  favorite: {
    food: 'chocolate',
    music: 'trance',
    books: ['Dune', 'Fountainhead']
  }
}];

let query = compiler({name: 'Elena'});
let results = records.filter(query);
//results = [{name: 'Elena', ... }]
```

To test equality of a nested element, specify access to it using a sub-object
or dot notation.

```javascript
/* sub-object notation */

let query = compiler({favorite: {food: /^cho/}});
let results = records.filter(query);
//results = [{name: 'Elena', ... }]
```

```javascript
/* dot notation */

let query = compiler({'favorite.music': 'trance'});
let results = records.filter(query);
//results = [{name: 'Elena', ... }]
```

If an object element is an array, then equality is asserted if a comparison 
value equals to the array or a comparison value equals to one of the array's 
values.

```javascript
/* array to array equality */

let query = compiler({'favorite.books': ['Dune', 'Fountainhead']});
let results = records.filter(query);
//results = [{name: 'Elena', ... }]
```

```javascript
/* array to value equality */

let query = compiler({'favorite.books': 'Dune'});
let results = records.filter(query);
//results = [{name: 'Elena', ... }]
```

#### *Primitive Operators (with $ref support)*

##### $eq

Supports all of the implicit equality operations, deep equality, and reference
($ref) equality.  Unlike other primitive operators, $eq does not unwind an 
object that follows it.  Instead, the value object will be used to assess deep 
equality.

```javascript
/* deep equality */

let records = [{
  name: 'Elena',
  favorite: {
    food: 'chocolate',
    music: 'trance'
  }
}, {
  name: 'Boris',
  favorite: {
    food: 'chocolate'
  }
}];

let query = compiler({favorite: {$eq: {food: 'chocolate'}}});
let results = records.filter(query);
//results = [{name: 'Boris', ... }]
```

Instead of specifying a comparator value, a reference may be used, which is an 
address to one of the object's elements.  Reference inclusion is supported for 
all the primitive operators listed in this section: `$gt`, `$gte`, etc.

```javascript
/* reference equality */

let records = [
  {lastName: 'Johnson', maidenName: null},
  {lastName: 'Jones', maidenName: 'Clarkson'},
  {lastName: 'Smith', maidenName: 'Smith'}
];

let query = compiler({lastName: {$eq: {$ref: 'maidenName'}}});
let results = records.filter(query);
//results = [{lastName: 'Smith', maidenName: 'Smith'}]
```

**Note:** `$ref` operator is not supported by mongodb.

##### $ne

Checks for inequality and is the reverse of `$eq` operator.

```javascript
let records = [
  {lastName: 'Johnson', maidenName: null},
  {lastName: 'Jones', maidenName: 'Clarkson'},
  {lastName: 'Smith', maidenName: 'Smith'}
];

let query = compiler({lastName: {$ne: {$ref: 'maidenName'}}});
let results = records.filter(query);
//results = [{lastName: 'Johnson', ... }, {lastName: 'Jones', ... }]
```

##### $gt

Diagnoses if an object element's value is greater than a comparator.

```javascript
let records = [
  {name: 'Bill', age: 30},
  {name: 'Sarah', age: 35},
  {name: 'John', age: 17}
];

let query = compiler({age: {$gt: 30}});
let results = records.filter(query);
//results = [{name: 'Sarah', age: 35}]
```

##### $gte

Determines if an object element's value is greater than or equal to a comparator.

```javascript
let records = [
  {name: 'Bill', age: 30},
  {name: 'Sarah', age: 35},
  {name: 'John', age: 17}
];

let query = compiler({age: {$gte: 30}});
let results = records.filter(query);
//results = [{name: 'Bill', age: 30}, {name: 'Sarah', age: 35}]
```

##### $lt

Assesses if an object element's value is less than a comparator.

```javascript
let records = [
  {name: 'Bill', age: 30},
  {name: 'Sarah', age: 35},
  {name: 'John', age: 17}
];

let query = compiler({age: {$lt: 18}});
let results = records.filter(query);
//results = [{name: 'John', age: 17}]
```

##### $lte

Tests if an object element's value is less than or equal to a comparator.

```javascript
let records = [
  {name: 'Bill', age: 30},
  {name: 'Sarah', age: 35},
  {name: 'John', age: 17}
];

let query = compiler({age: {$lte: 30}});
let results = records.filter(query);
//results = [{name: 'Bill', age: 30}, {name: 'John', age: 17}]
```

##### $in

Evaluates if an object element's value is included in an array of test values.
If an element's value is an array, then `mongo-query-compiler` will determine if 
the array is a subset of the test values.

```javascript
let records = [
  {name: 'Bill', car: ['toyota', 'jeep']},
  {name: 'Sarah', car: 'lexus'},
  {name: 'John', car: 'volvo'}
];

let query = compiler({car: {$in: ['toyota', 'lexus', 'jeep']}});
let results = records.filter(query);
//results = [{name: 'Bill', ... }, {name: 'Sarah', ... }]
```

##### $nin

Reverse of the `$in` operator.

```javascript
let records = [
  {name: 'Bill', car: ['toyota', 'jeep']},
  {name: 'Sarah', car: 'lexus'},
  {name: 'John', car: 'volvo'}
];

let query = compiler({car: {$nin: ['toyota', 'lexus', 'jeep']}});
let results = records.filter(query);
//results = [{name: 'John', car: 'volvo'}]
```

##### Primitive operations and object element's existence

It is important to note that all non-negating primitive operations (e.g., `$eq`, 
`$lt`) will automatically return `false` if an object element does not exist.
All negating primitive operations (i.e., `$ne` and `$nin`) will automatically 
return `true` if an object element does not exist.

#### *Array Operators*

##### $all

##### $size

##### $elemMatch

#### *Free-form Operators*

##### $where

#### *Compound Operators*

##### Implicit $and

##### $and

##### $or

##### $nor

##### $not

#### *Utility Operators*

##### $flatten

### Limitations and Caveats

performance and grammar
