import { Module } from '@nestjs/common';
import { LoggingPlugin } from 'src/plugin/log.plugin';
import { CatsResolver } from './cats.resolver';
import { CatsService } from './cats.service';

@Module({
  imports: [],
  providers: [CatsResolver, CatsService, LoggingPlugin]
})
export class CatsModule {}
