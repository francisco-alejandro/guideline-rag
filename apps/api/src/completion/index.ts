import { Module } from '@nestjs/common';
import { SharedModule } from '~shared';
import { MessageCreateCommandHandler } from './application/create';
import { MessageSemanticReadQueryHandler } from './application/read';
import { MessagePostController } from './infrastructure/network';
import { MessageRepository } from './domain';
import { SupabaseMessageRepository } from './infrastructure/persistence';
import { GuidelineModule } from '~guideline';

const MessageRepositoryProvider = {
  provide: MessageRepository,
  useClass: SupabaseMessageRepository,
};

@Module({
  imports: [SharedModule, GuidelineModule],
  controllers: [MessagePostController],
  providers: [
    MessageCreateCommandHandler,
    MessageRepositoryProvider,
    MessageSemanticReadQueryHandler,
  ],
})
export class CompletionModule {}
