import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CatsModule } from './cats/cats.module';
import { MathModule } from './math/math.module';
import { CustomOddNumberScalar } from './types/odd.scalar';
import { upperDirectiveTransformer } from './directives/root.directive';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { MusicModule } from './music/music.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // typePaths: ["../**/cats.graphql"],
      autoSchemaFile: 'schema.gql',
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true
      },
      resolvers: {
        Odd: CustomOddNumberScalar 
      },
      transformSchema: (schema) => upperDirectiveTransformer(schema, ['upper', 'lower']),
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION]
          }),
          new GraphQLDirective({
            name: 'lower',
            locations: [DirectiveLocation.FIELD_DEFINITION]
          }),
        ]
      }
    }),
    CatsModule,
    MathModule,
    MusicModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
