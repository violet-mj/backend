import { createUnionType, Field, ID, Int, ObjectType } from "@nestjs/graphql"

export const classic = [
  {
    id: 1,
    name: 'walts',
    length: '10:23',
    createdAt: 1823,
  },
  {
    id: 2,
    name: 'mo',
    length: '12:23',
    createdAt: 1723,
  },
  {
    id: 4,
    name: 'adsfa',
    length: '10:12',
    createdAt: 1523,
  },
  {
    id: 3,
    name: 'mlasdfo',
    length: '5:23',
    createdAt: 1834,
  },
]

export const pop = [
  {
    id: 1,
    title: 'lie',
    artist: 'bigbang',
    length: '3:23',
    createdAt: 2010,
  },
  {
    id: 2,
    title: 'TT',
    artist: 'twice',
    length: '4:23',
    createdAt: 2016,
  },
  {
    id: 3,
    title: 'fire',
    artist: 'btw',
    length: '2:33',
    createdAt: 2019,
  },
]

@ObjectType()
export class Classic {

  @Field(types => ID)
  id: number

  @Field()
  name: string

  @Field()
  length: string

  @Field(types => Int)
  createdAt: number

}

@ObjectType()
export class Pop {
  
  @Field(types => ID)
  id: number

  @Field()
  title: string

  @Field()
  artist: string

  @Field()
  length: string

  @Field(types => Int)
  createdAt: number
}

export const Music = createUnionType({
  name: 'Music',
  types: () => [Classic, Pop] as const,
  resolveType(value) {
    if(value.length) {
      if(value.artist) {
        return 'Pop'
      } else {
        return 'Classic'
      }
    }
    return null
  }
})
