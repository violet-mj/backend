const { gql } = require('apollo-server')
const database = require('../database')

const teamType = gql`
  type Team {
    id: Int
    manager: String
    office: String
    extension_number: String
    mascot: String
    cleaning_duty: String
    project: String
    supplies: [Supply]
  }
`

const teamResolvers = {
  Query: {
    teams: () => database.teams
      .map((team) => {
        team.supplies = database.supplies
          .filter((supply) => {
            return supply.team === team.id
          })
        return team
      }),
    team: (parent, args, context, info) => database.teams
      .filter((team) => {
        console.log(team.id, ":", args.id)
        return team.id === args.id
      })[0],
  }
}

module.exports = {
  typeDefs: teamType,
  resolvers: teamResolvers
}