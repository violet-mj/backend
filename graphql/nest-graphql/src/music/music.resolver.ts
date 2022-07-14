import { Resolver, Query, ResolveField } from '@nestjs/graphql';
import { classic, Music, pop } from './music';

@Resolver(of => Music)
export class MusicResolver {

  @Query(returns => [Music])
  musics(): Array<any> {
    return [...classic, ...pop]
  }

}
