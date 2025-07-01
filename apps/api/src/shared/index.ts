import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EmbedService, EventRepository, ResponseService } from '~shared/domain';
import { ConfigModule } from '@nestjs/config';
import {
  SupabaseEventRepository,
  SupabaseProvider,
} from '~shared/infrastructure/persistence';
import { StoreEventHandler } from '~shared/application';
import {
  OpenAIEmbedService,
  OpenAIProvider,
} from '~shared/infrastructure/embed';
import { OpenAIResponseService } from './infrastructure/llm/OpenAIResponseService';

const EventRepositoryProvider = {
  provide: EventRepository,
  useClass: SupabaseEventRepository,
};

const EmbedServiceProvider = {
  provide: EmbedService,
  useClass: OpenAIEmbedService,
};

const ResponseServiceProvider = {
  provide: ResponseService,
  useClass: OpenAIResponseService,
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    CqrsModule,
    SharedModule,
  ],
  providers: [
    EventRepositoryProvider,
    SupabaseProvider,
    StoreEventHandler,
    OpenAIProvider,
    EmbedServiceProvider,
    ResponseServiceProvider,
  ],
  exports: [
    CqrsModule,
    ConfigModule,
    SupabaseProvider,
    OpenAIProvider,
    EmbedServiceProvider,
    ResponseServiceProvider,
  ],
})
export class SharedModule {}
