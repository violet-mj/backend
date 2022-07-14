import { Plugin } from '@nestjs/apollo'
import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestContext,
  GraphQLRequestListener
} from 'apollo-server-plugin-base'

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  async requestDidStart(requestContext: GraphQLRequestContext): Promise<GraphQLRequestListener>{
    return {
        async parsingDidStart(requestContext: GraphQLRequestContext) {
        }
    }
  }
}