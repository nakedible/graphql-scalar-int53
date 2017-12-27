import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql';
import { Kind } from 'graphql/language';

import GraphQLInt53 from '../src/index';

describe('GraphQLInt53', () => {
    describe('directly', () => {
        it('serializes', () => {
            expect(GraphQLInt53.serialize(1)).toEqual(1);
            expect(GraphQLInt53.serialize('123')).toEqual(123);
            expect(GraphQLInt53.serialize(0)).toEqual(0);
            expect(GraphQLInt53.serialize(-1)).toEqual(-1);
            expect(GraphQLInt53.serialize(1e5)).toEqual(100000);
            // The GraphQL specification does not allow serializing non-integer values
            // as Int to avoid accidental data loss.
            expect(() => GraphQLInt53.serialize(0.1)).toThrow(
                'Int53 cannot represent non-integer value: 0.1',
            );
            expect(() => GraphQLInt53.serialize(1.1)).toThrow(
                'Int53 cannot represent non-integer value: 1.1',
            );
            expect(() => GraphQLInt53.serialize(-1.1)).toThrow(
                'Int53 cannot represent non-integer value: -1.1',
            );
            expect(() => GraphQLInt53.serialize('-1.1')).toThrow(
                'Int53 cannot represent non-integer value: -1.1',
            );
            // Safe JavaScript int, but bigger than 2^32
            expect(GraphQLInt53.serialize(9876504321)).toEqual(9876504321);
            expect(GraphQLInt53.serialize(-9876504321)).toEqual(-9876504321);
            // Maximum safe Int53 value
            expect(GraphQLInt53.serialize(9007199254740991)).toEqual(9007199254740991);
            expect(GraphQLInt53.serialize(-9007199254740991)).toEqual(-9007199254740991);
            // Just beyond maximum safe Int53 value
            expect(() => GraphQLInt53.serialize(9007199254740992)).toThrow(
                'Int53 cannot represent non 53-bit signed integer value: 9007199254740992',
            );
            expect(() => GraphQLInt53.serialize(-9007199254740992)).toThrow(
                'Int53 cannot represent non 53-bit signed integer value: -9007199254740992',
            );
            // Too big to represent as an Int in JavaScript or GraphQL
            expect(() => GraphQLInt53.serialize(1e100)).toThrow(
                'Int53 cannot represent non 53-bit signed integer value: 1e+100',
            );
            expect(() => GraphQLInt53.serialize(-1e100)).toThrow(
                'Int53 cannot represent non 53-bit signed integer value: -1e+100',
            );
            expect(() => GraphQLInt53.serialize('one')).toThrow(
                'Int53 cannot represent non 53-bit signed integer value: one',
            );
            expect(GraphQLInt53.serialize(false)).toEqual(0);
            expect(GraphQLInt53.serialize(true)).toEqual(1);
            expect(() => GraphQLInt53.serialize('')).toThrow(
                'Int53 cannot represent non 53-bit signed integer value: (empty string)',
            );
            expect(() => GraphQLInt53.serialize(NaN)).toThrow(
                'Int53 cannot represent non 53-bit signed integer value: NaN',
            );
            expect(() => GraphQLInt53.serialize(Infinity)).toThrow(
                'Int53 cannot represent non 53-bit signed integer value: Infinity',
            );
            expect(() => GraphQLInt53.serialize(-Infinity)).toThrow(
                'Int53 cannot represent non 53-bit signed integer value: -Infinity',
            );
        });
        it('parses value', () => {
            expect(GraphQLInt53.parseValue(1)).toEqual(1);
            expect(GraphQLInt53.parseValue('123')).toEqual(123);
            expect(GraphQLInt53.parseValue(0)).toEqual(0);
            expect(GraphQLInt53.parseValue(-1)).toEqual(-1);
            expect(GraphQLInt53.parseValue(1e5)).toEqual(100000);
            // The GraphQL specification does not allow serializing non-integer values
            // as Int to avoid accidental data loss.
            expect(() => GraphQLInt53.parseValue(0.1)).toThrow(
                'Int53 cannot represent non-integer value: 0.1',
            );
            expect(() => GraphQLInt53.parseValue(1.1)).toThrow(
                'Int53 cannot represent non-integer value: 1.1',
            );
            expect(() => GraphQLInt53.parseValue(-1.1)).toThrow(
                'Int53 cannot represent non-integer value: -1.1',
            );
            expect(() => GraphQLInt53.parseValue('-1.1')).toThrow(
                'Int53 cannot represent non-integer value: -1.1',
            );
            // Safe JavaScript int, but bigger than 2^32
            expect(GraphQLInt53.parseValue(9876504321)).toEqual(9876504321);
            expect(GraphQLInt53.parseValue(-9876504321)).toEqual(-9876504321);
            // Maximum safe Int53 value
            expect(GraphQLInt53.parseValue(9007199254740991)).toEqual(9007199254740991);
            expect(GraphQLInt53.parseValue(-9007199254740991)).toEqual(-9007199254740991);
            // Just beyond maximum safe Int53 value
            expect(() => GraphQLInt53.parseValue(9007199254740992)).toThrow(
                'Int53 cannot represent non 53-bit signed integer value: 9007199254740992',
            );
            expect(() => GraphQLInt53.parseValue(-9007199254740992)).toThrow(
                'Int53 cannot represent non 53-bit signed integer value: -9007199254740992',
            );
            // Too big to represent as an Int in JavaScript or GraphQL
            expect(() => GraphQLInt53.parseValue(1e100)).toThrow(
                'Int53 cannot represent non 53-bit signed integer value: 1e+100',
            );
            expect(() => GraphQLInt53.parseValue(-1e100)).toThrow(
                'Int53 cannot represent non 53-bit signed integer value: -1e+100',
            );
            expect(() => GraphQLInt53.parseValue('one')).toThrow(
                'Int53 cannot represent non 53-bit signed integer value: one',
            );
            expect(GraphQLInt53.parseValue(false)).toEqual(0);
            expect(GraphQLInt53.parseValue(true)).toEqual(1);
            expect(() => GraphQLInt53.parseValue('')).toThrow(
                'Int53 cannot represent non 53-bit signed integer value: (empty string)',
            );
            // GraphQL parseValue automatically rejects NaN without exception
            expect(GraphQLInt53.parseValue(NaN)).toEqual(undefined);
            expect(() => GraphQLInt53.parseValue(Infinity)).toThrow(
                'Int53 cannot represent non 53-bit signed integer value: Infinity',
            );
            expect(() => GraphQLInt53.parseValue(-Infinity)).toThrow(
                'Int53 cannot represent non 53-bit signed integer value: -Infinity',
            );
        });
        it('parses literal', () => {
            expect(GraphQLInt53.parseLiteral({kind: Kind.INT, value: '1'})).toEqual(1);
            expect(GraphQLInt53.parseLiteral({kind: Kind.INT, value: '123'})).toEqual(123);
            expect(GraphQLInt53.parseLiteral({kind: Kind.INT, value: '0'})).toEqual(0);
            expect(GraphQLInt53.parseLiteral({kind: Kind.INT, value: '-1'})).toEqual(-1);
            expect(GraphQLInt53.parseLiteral({kind: Kind.INT, value: '100000'})).toEqual(100000);
            // Safe JavaScript int, but bigger than 2^32
            expect(GraphQLInt53.parseLiteral({kind: Kind.INT, value: '9876504321'})).toEqual(9876504321);
            expect(GraphQLInt53.parseLiteral({kind: Kind.INT, value: '-9876504321'})).toEqual(-9876504321);
            // Maximum safe Int53 value
            expect(GraphQLInt53.parseLiteral({kind: Kind.INT, value: '9007199254740991'})).toEqual(9007199254740991);
            expect(GraphQLInt53.parseLiteral({kind: Kind.INT, value: '-9007199254740991'})).toEqual(-9007199254740991);
            // Just beyond maximum safe Int53 value
            expect(GraphQLInt53.parseLiteral({kind: Kind.INT, value: '9007199254740992'})).toBe(undefined);
            expect(GraphQLInt53.parseLiteral({kind: Kind.INT, value: '-9007199254740992'})).toBe(undefined);
            // Too big to represent as an Int in JavaScript or GraphQL
            expect(GraphQLInt53.parseLiteral({kind: Kind.INT, value: '100000000000000000000000000000000000000'})).toBe(undefined);
            expect(GraphQLInt53.parseLiteral({kind: Kind.INT, value: '-100000000000000000000000000000000000000'})).toBe(undefined);
            // Invalid types
            expect(GraphQLInt53.parseLiteral({kind: Kind.String, value: 'one'})).toBe(undefined);
            expect(GraphQLInt53.parseLiteral({kind: Kind.BOOLEAN, value: false})).toBe(undefined);
            expect(GraphQLInt53.parseLiteral({kind: Kind.BOOLEAN, value: true})).toBe(undefined);
            expect(GraphQLInt53.parseLiteral({kind: Kind.FLOAT, value: '1.0'})).toBe(undefined);
        });
    });
    describe('via frontend', () => {
        const schema = new GraphQLSchema({
            query: new GraphQLObjectType({
                name: 'RootQueryType',
                fields: {
                    outputTest: {
                        type: GraphQLInt53,
                        resolve: () => 3
                    },
                    inputTest: {
                        type: GraphQLInt53,
                        args: {
                            input: { type: GraphQLInt53 }
                        },
                        resolve: (_, {input}) => input
                    }
                }
            })
        });
        it('serializes', () => {
            return expect(graphql(schema, '{ outputTest }')).resolves.toMatchObject({data: {outputTest: 3}});
        });
        it('parses value', () => {
            return expect(graphql(schema, '{ inputTest(input: 9007199254740991) }')).resolves.toMatchObject({data: {inputTest: 9007199254740991}});
        });
        it('parses literal', () => {
            return expect(graphql(schema, 'query Foo($i: Int53!) { inputTest(input: $i) }', undefined, undefined, {i: 3})).resolves.toMatchObject({data: {inputTest: 3}});
        });
    });
});
