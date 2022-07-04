const { gql } = require('apollo-server')
const database = require('../database')

const supplyType = gql`
  type Supply {
    id: String
    team: Int
  }
`

const supplyResolvers = {
  Query: {
    supplies: () => database.supplies
  }, 
}

module.exports = {
  typeDefs: supplyType,
  resolvers: supplyResolvers
}