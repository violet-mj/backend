const express = require('express')
const { ApolloServer, gql} = require('apollo-server-express')
const { PubSub } = require('graphql-subscriptions')
const { faker } = require("@faker-js/faker")

const pubSub = new PubSub()

const typeDefs = gql`
  type Query {
    cars: [car]
  }

  type car {
    name: String
    cc: Int
    sort: String
  }

  type Subscription {
    newCar: Car!
  }

`

const resolvers = {
  Query: {
    cars: () => {
      return [
        {
          name: 'avante',
          cc: 1500,
          sort: 'sedan'
        },
        {
          name: 'santafe',
          cc: 2000,
          sort: 'suv'
        }
      ]
    }
  },
  Subscription: {
    newCar: {

    }
  }
}

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({typeDefs, resolvers})

  await server.start()

  const app = express()

  server.applyMiddleware({
    app,
    path: '/graphql'
  })

  await new Promise(resolve => app.listen({port: 4000}, resolve))

  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers)

for(let i; i < 10; i++) {
  pubSub.publish("messageAdded", {
      messageAdded: faker.lorem.sentence()
  })
}
