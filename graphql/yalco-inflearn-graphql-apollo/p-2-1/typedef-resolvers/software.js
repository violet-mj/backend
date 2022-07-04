const { gql } = require('apollo-server')
const database = require('../database.js')

const typeDefs = gql`
    type Software implements Tool {
        id: ID!
        used_by: Role!
        developed_by: String!
        description: String
    }
`
const resolvers = {
    Query: {
        softwares: (parent, args) => database.softwares,
        software: (parent, args) => database.softwares[0] 
    },
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}