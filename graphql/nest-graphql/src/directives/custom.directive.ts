import { GraphQLFieldResolver } from "graphql";

const customDirective= {
  upperMethod: (value: string): string => { 
    if (typeof value === 'string') {
      return value.toUpperCase();
    }
    return value;
  },
  lowerMethod: (value: string): string => { 
      if(typeof value === 'string') {
        return value.toLowerCase()
      }
      return value
    }
  }

function customDirectiveFactory<Type>(resolve: GraphQLFieldResolver<any, any, any, any>, directiveName: string) {
  return async function (source, args, context, info): Promise<Type> {
    const result  = await resolve(source, args, context, info) 
    return customDirective[directiveName + "Method"](result) 
  } 
}


export default customDirectiveFactory