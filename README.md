# mongo-query-compiler

### Introduction

The utility transpiles mongodb-like query objects into a JavaScript filtering 
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

### Use Cases and Background

`mongo-query-compiler` was written to simplify search criteria that were to be applied
to an array of relatively complex objects.  Just writing filtering functions proved to
be somewhat messy and MongoDB's query language was chosen as the declarative basis to
specify selection parameters more cleanly.  That is not the only use case for the utility.
Although not fully recommended, it was used by some as a replacement for MongoDB in testing.
`mongo-query-compiler` was also employed to build relatively low-scale and yet expressive
rules engines.  Its grammar supports specification of rules of any depth and complexity
and can thus represent rich use cases.  Despite the emphasis on low- to mid-scale, the
compiled queries can be executed at a rate of 10s to 100s of thousands per second depending
on the hardware and the query sophistication.

### Documentation

For complete documentation and examples, see 
[mongo-query-compiler-docs](https://github.com/aptivator/mongo-query-compiler-docs)
project.
