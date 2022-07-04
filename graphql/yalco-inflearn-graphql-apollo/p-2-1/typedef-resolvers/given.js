const { gql } = require('apollo-server')
const database = require('../database')

const typeDefs = gql`
  union Given = Equipment | Supply
`

const resolvers = {
  Query: {
    givens: (parent, args) => {
      return [
        ...database.equipments,
        ...database.supplies
      ]
    }
  },
  Given: {
    __resolveType(given, context, info) {
      if(given.used_by) {
        return 'Equipment'
      }
      if(given.team) {
        return 'Supply'
      }
      return null
    }
  }
}

module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers
}