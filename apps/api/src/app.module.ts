import { Module } from '@nestjs/common';

import { GuidelineModule } from '~guideline';
import { CompletionModule } from '~completion';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [GuidelineModule, CompletionModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
