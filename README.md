# GraphQL Int53 Scalar Type

GraphQL Int represents a signed 32‐bit numeric non‐fractional value.
It supports values with a range from -(2**31) to 2**31 - 1.

GraphQL Int53 is a scalar that matches the behavior of the `Int` type,
but with a range from -(2**53 - 1) to 2**53 - 1. This corresponds to
the safe integer range of a IEEE 754 double precision binary
floating-point value.

## Getting Started

Install `graphql-scalar-int53` using npm

```sh
npm install --save graphql-scalar-int53
```

Example:

```js
import GraphQLInt53 from 'graphql-scalar-int53';
```
