const { gql } = require('apollo-server')
const database = require('../database')

const equipmentType = gql`
  type Equipment implements Tool{
    id: ID!
    used_by: Role!
    count: Int
    new_or_used: NewOrUsed
  }
  type EquipmentAdv {
    id: ID!
    used_by: Role
    count: Int
    new_or_used: NewOrUsed
    use_rate: Float
    is_new: Boolean
  }
`

const equipmentResolvers = {
  Query: {
    equipments: () => database.equipments,
    equipmentAdvs: () => database.equipments
      .map((equipment) => {
        if(equipment.used_by === 'developer') {
          equipment.use_rate = Math.random().toFixed(2)
        }
        equipment.is_new = equipment.new_or_used === 'new'
        return equipment
      })
  }, 
  Mutation: {
    insertEquipment: (parent, args, context, info) => {
      database.equipments.push(args)
      return args
    }, 
    editEquipment: (parent, args, context, info) => {
      return database.equipments.filter((equipment) => {
        return equipment.id === args.id
      }).map((equipment) => {
        Object.assign(equipment, args)
        return equipment
      })[0]
    },
    deleteEquipment: (parent, args, context, info) => {
      const deleted = database.equipments
        .filter((equipment) => {
          return equipment.id === args.id
        })[0]

      database.equipments = database.equipments
        .filter((equipment) => {
          return equipment.id !== args.id
        })

      return deleted
    }
  }
}

module.exports = {
  typeDefs: equipmentType,
  resolvers: equipmentResolvers
}