# GraphQL Int53 Scalar Type

GraphQL Int53 is a scalar that matches the behavior of the `Int` type,
but with a range from `-(2**53 - 1)` to `2**53 - 1`. This corresponds to
the safe integer range of an IEEE 754 double precision binary
floating-point value.

It is meant as a direct alternative to GraphQL Int, which represents a
signed 32‐bit numeric non‐fractional value and supports values with a
range from `-(2**31)` to `2**31 - 1`.

## Why Does This Exist?

There are numerous places where integral values exceed 2 billion:

- `fileSizeInBytes` (files larger than 2 gigabytes)
- `millisecondsSinceEpoch` (such as JavaScript/Java `Date.getDate()`)
- `secondsSinceEpoch` (after 2038, [Year 2038 Problem](https://en.wikipedia.org/wiki/Year_2038_problem))
- `freeMemoryInBytes` (RAM larger than 2 gigabytes)
- `monetaryAmount` (as defined by ISO 4217)
- `databaseRowId` (more than 2 billion database rows)
- `youtubeVideoViewCount` (currently over 20 videos have this)
- `facebookMonthlyActiveUserCount` (reaching over 2 billion)

These values could be represented by `Float`, but that would be
confusing as they are integers, and would be inefficient in
programming languages where there is a natural 64-bit integer type.
They could also be represented by `String`, but that would mean an
additional parsing and validation step. These values could also be
represented by a 64-bit integer, but that would be problematic for
JavaScript, Lua and other languages which use an IEEE 754 double
precision binary floating-point value as their primary number type.

While somewhat unconventional, the 53-bit integer is a "least common
denominator" type that can easily be supported by all programming
languages.

## Getting Started

Install `graphql-scalar-int53` using npm

```sh
npm install --save graphql-scalar-int53
```

Example:

```js
import { graphql, buildSchema } from 'graphql';
import GraphQLInt53 from 'graphql-scalar-int53';

const schema = buildSchema(`
scalar Int53
type Query {
    output: Int53
    inputVariable(value: Int53): Int53
    inputLiteral(value: Int53): Int53
}
`);

const query = `
query ($value: Int53) {
    output
    inputVariable(value: $value)
    inputLiteral(value: 9876504321)
}
`;

const root = {
    output: 9876504322,
    inputVariable: ({value}) => value,
    inputLiteral: ({value}) => value,
}

graphql(schema, query, root, null, {value: 98765043223}).then(console.log);

// Outputs:
// { data:
//    { output: 9876504322,
//      inputVariable: 98765043223,
//      inputLiteral: 9876504321 } }
```
