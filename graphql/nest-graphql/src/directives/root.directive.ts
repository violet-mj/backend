import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';
import customDirectiveFactory from './custom.directive';

export function upperDirectiveTransformer(
  schema: GraphQLSchema,
  directiveNames: string[],
) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directiveName = fieldConfig.astNode?.directives[0].name.value
      const customDirective = getDirective(
        schema,
        fieldConfig,
        directiveName,
      )?.[0];

      if (customDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve =  customDirectiveFactory(resolve, directiveName)
      }
      return fieldConfig;
    }
  })
};