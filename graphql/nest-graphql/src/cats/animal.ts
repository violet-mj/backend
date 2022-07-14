

import { InterfaceType, Field, Int, ObjectType, ID, Directive, Extensions } from '@nestjs/graphql'
import Role from 'src/constant/role.constant'
import { checkRoleMiddleware } from 'src/middleware/checkrole.middleware'
import { loggerMiddleware } from '../middleware/logger.middleware'
@InterfaceType()
export abstract class AnimalIdentifier {

  @Field(type => ID)
  id: number

  @Field()
  name: string
}



@ObjectType({
  implements: () => AnimalIdentifier
})
export class Animal {

  @Field(type => ID!, {nullable: false})
  id: number

  @Directive('@lower')
  @Field()
  name: string

  @Field(type => Boolean, {
    middleware: [checkRoleMiddleware]
  })
  @Extensions({ role: Role.USER })
  isFly: boolean

  @Field(type => Int, {
    middleware: [loggerMiddleware]
  })
  averagesize: number 

  @Field(type => [People], {nullable: true})
  people?: People[]
}


@ObjectType()
export class People {
  
  @Field(type => ID!)
  id: number

  @Field()
  name: string

  @Field()
  ownAnimalId: number

  @Field(type => Int)
  age: number
}

type tsAnimal = {
  id: number,
  name: string,
  isFly: boolean,
  averagesize: number
} 

type tsPeople = {
  id: number,
  ownAnimalId: number,
  name: string,
  age: number
}


export let animal: Animal[] = [
  {
    id: 1,
    name: 'cat',
    isFly: false,
    averagesize: 13
  },
  {
    id: 2,
    name: 'dog',
    isFly: false,
    averagesize: 16
  },
  {
    id: 3,
    name: 'duck',
    isFly: false,
    averagesize: 12
  },
]
 

export const peoples: People[] = [
  {
    id: 1,
    ownAnimalId: 1,
    name: 'john',
    age: 12
  },
  {
    id: 2,
    ownAnimalId: 1,
    name: 'Mike',
    age: 11
  },
  {
    id: 3,
    ownAnimalId: 2,
    name: 'Maria',
    age: 19
  },
  {
    id: 4,
    ownAnimalId: 3,
    name: 'bella',
    age: 15
  },
  {
    id: 5,
    ownAnimalId: 3,
    name: 'minjun',
    age: 22
  },
  {
    id: 6,
    ownAnimalId: 3,
    name: 'kate',
    age: 32 
  },
]

