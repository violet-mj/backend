const { gql } = require('apollo-server')

const rootQueryType = gql`
  type Query {
    teams: [Team]
    team(id: Int): Team
    equipments: [Equipment]
    equipmentAdvs: [EquipmentAdv]
    supplies: [Supply]
    givens: [Given]
    softwares: [Software]
    software: Software
    people: [People]
    peopleFiltered(
      team: Int,
      sex: Sex,
      blood_type: BloodType,
      from: String
    ): [People]
  }
`

module.exports = rootQueryType