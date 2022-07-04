const { ApolloServer } = require('apollo-server')
  
const queryType = require('./typedef-resolvers/_query')
const mutationType = require('./typedef-resolvers/_mutation')
const enumType = require('./typedef-resolvers/_enum')
const equipment = require('./typedef-resolvers/equipments')
const supply = require('./typedef-resolvers/supplies')
const team = require('./typedef-resolvers/team')
const given = require('./typedef-resolvers/given')
const tool = require('./typedef-resolvers/tool')
const software = require('./typedef-resolvers/software')
const people = require('./typedef-resolvers/people')


const typeDefs = [
  queryType,
  mutationType,
  enumType,
  equipment.typeDefs,
  supply.typeDefs,
  team.typeDefs,
  given.typeDefs,
  tool.typeDefs,
  software.typeDefs,
  people.typeDefs
]

const resolvers = [
  equipment.resolvers,
  supply.resolvers,
  team.resolvers,
  given.resolvers,
  tool.resolvers,
  software.resolvers,
  people.resolvers
]

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
console.log(`🚀  Server ready at ${url}`)
})

