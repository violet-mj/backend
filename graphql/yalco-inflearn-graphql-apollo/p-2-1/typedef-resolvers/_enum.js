const {gql} = require('apollo-server')

const typeDefs = gql`
  enum Role {
    developer
    designer
    planner
  }
  enum NewOrUsed {
    new
    used
  }
  enum Sex {
    male
    female
  }
  enum BloodType {
    A
    B
    AB
    O
  }
`

module.exports = typeDefs