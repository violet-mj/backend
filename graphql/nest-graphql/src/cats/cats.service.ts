import { Injectable } from "@nestjs/common";
import { animal, Animal} from './animal'

@Injectable()
export class CatsService {

  findAll(): Animal[] {
    return animal
  }

  findOne(id: number): Animal {
    const result = animal.filter(ani => {
      return ani.id === id
    })

    return result[0]
  }
}