import { HttpModule, Module } from '@nestjs/common';
import { CrawlController } from './crawl.controller';

@Module({
  imports: [HttpModule],
  controllers: [CrawlController],
  providers: [],
})
export class CrawlModule {}
