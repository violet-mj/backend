import { Module } from '@nestjs/common';
import { MusicResolver } from './music.resolver';

@Module({
  providers: [MusicResolver]
})
export class MusicModule {}
