import { GraphQLScalarType, Kind, ValueNode } from "graphql" 
import { UserInputError } from "apollo-server-express";

function validate(num: number): number | never {
    if(typeof num === "number" && Number.isInteger(num) && num % 2 !== 0) {
      return num
    }
    throw new UserInputError("Provided value is not an odd integer") 
}

function parseLiteralValidator(ast: ValueNode): number | never {
    if(ast.kind === Kind.INT) {
      return parseInt(ast.value)
    }
    return null
}

export const CustomOddNumberScalar: GraphQLScalarType<number, number> = new GraphQLScalarType<number, number>({
  name         : "Odd",
  description  : "A Simple Odd Number validator",
  serialize    : (value: number): number => validate(value),
  parseValue   : (value: number): number => validate(value),
  parseLiteral : (ast: ValueNode): number | null => parseLiteralValidator(ast)
})