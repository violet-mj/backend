import { Resolver, Query, ResolveField, Args, Int, Parent, Mutation, Subscription, Directive } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { peoples, Animal, People, animal } from './animal'
import { PubSub } from 'graphql-subscriptions'
import { CustomOddNumberScalar } from 'src/types/odd.scalar';
import { ExamGuard } from 'src/guard/exam.guard';
import { UseGuards } from '@nestjs/common';

const pubSub = new PubSub()

// @Resolver("Animal")
// export class CatsResolver {

//   constructor(
//     private readonly catsService: CatsService
//   ) {}


//   @Query('animals')
//   async getanimals() {
//     return this.catsService.findAll()
//   }

//   @Query()
//   async animal(@Args('id', { type: () => Int}) id: number) {
//     return this.catsService.findOne(id)
//   }

//   @Query()
//   async hello() {
//     return 'hello'
//   }

//   @ResolveField()
//   async people(@Parent() animal) {
//     const { id } = animal

//     return peoples.filter((p) => {
//       return p.ownAnimalId === id
//     })
//   }

// }


@Resolver(of => Animal)
export class CatsResolver {

  constructor(
    private readonly catsService: CatsService
  ) {}

  @Query(returns => CustomOddNumberScalar)
  getOdd() {
    return 1
  }

  @UseGuards(ExamGuard)
  @Directive('@upper')
  @Query(returns => [Animal])
  async animals() {
    return this.catsService.findAll()
  }

  @Query(returns => Animal)
  async animal(@Args('id', { type: () => Int}) id: number) {
    return this.catsService.findOne(id)
  }

  @Mutation(returns => Animal)
  async createAnimal(
    @Args('name', {type: () => String}) name: string,
    @Args('isFly', {type: () => Boolean}) isFly: boolean,
    @Args('averagesize', {type: () => Int}) averagesize: number 
  ) {
    const lastAnimalId = animal[animal.length - 1].id

    const pushAnimal = {
      id: lastAnimalId + 1,

      name,
      isFly,
      averagesize
    }

    animal.push(pushAnimal)

    pubSub.publish('animalSub', { animalSub: pushAnimal})

    return pushAnimal
  }

  @Mutation(returns => Animal)
  async updateAnimal(
    @Args('name', {type: () => String}) name: string,
    @Args('isFly', {type: () => Boolean, nullable: true}) isFly?: boolean,
    @Args('averagesize', {type: () => Int, nullable: true}) averagesize?: number 
  ) {
    const animalData = animal.filter((ani) => {
      return ani.name === name
    })[0]

    animalData.isFly = isFly !== null ? isFly : animalData.isFly 
    animalData.averagesize = averagesize ? averagesize : animalData.averagesize

    return animalData
  }


  @Query(returns => String)
  async hello() {
    return 'hello'
}

@Subscription(returns => Animal)
animalSub() {
  return pubSub.asyncIterator('animalSub')
}

  @ResolveField('people')
  async people(@Parent() animal: Animal) {
    const { id } = animal

    return peoples.filter((p) => {
      return p.ownAnimalId === id
    })
  }

}