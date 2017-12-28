# GraphQL Int53 Scalar Type

GraphQL Int represents a signed 32‐bit numeric non‐fractional value.
It supports values with a range from `-(2**31)` to `2**31 - 1`.

GraphQL Int53 is a scalar that matches the behavior of the `Int` type,
but with a range from `-(2**53 - 1)` to `2**53 - 1`. This corresponds to
the safe integer range of a IEEE 754 double precision binary
floating-point value.

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
