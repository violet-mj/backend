const { gql } = require('apollo-server')

const rootMutationType = gql`
  type Mutation {
    deleteEquipment(id: String): Equipment
    insertEquipment(
      id: String,
      used_by: String,
      count: Int,
      new_or_used: String
    ): Equipment
    editEquipment(
      id: String,
      used_by: String,
      count: Int,
      new_or_used: String
    ): Equipment
  }
`

module.exports = rootMutationType