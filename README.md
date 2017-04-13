# mongo-query-compiler

### Introduction

This utility transpiles mongodb-like query objects into a JavaScript filtering 
functions.  The latter may then be used with any array's `.filter()` method to 
isolate the needed data subset.  The software was written to provide a more 
natural and declarative way to specify search criteria.  Given MongoDB's 
popularity, its query grammar was used as the basis for the syntax interpreted 
by this program.  mongo-query-compiler is meant to be used in development
situations that require relatively complex filtering operations. For rudimentary
filtering, [lodash](https://lodash.com/)'s `_.filter` method is recommended.

### Installation

```
npm install --save mongo-query-compiler
```

### Primitive Operators

### Compound Operators

### Utility Operators

### Query Examples

### Limitations