import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SharedModule } from '~shared';
import { GuidelinePostController } from '~guideline/infrastructure/network';
import { GuidelineCreateCommandHandler } from '~guideline/application/create';
import { GuidelineRepository } from '~guideline/domain';
import { SupabaseGuidelineRepository } from '~guideline/infrastructure/persistence';
import { GuidelineEmbedCommandHandler } from '~guideline/application/embed';
import { GuidelineSagas } from './infrastructure/sagas/GuidelineSagas';
import { GuidelineSemanticReadQueryHandler } from './application/read/GuidelineSemanticReadQueryHandler';
import { GuidelineAdapter } from './application/adapter';

export const GUIDELINE_TOKEN = 'Guideline';

const GuidelineRepositoryProvider = {
  provide: GuidelineRepository,
  useClass: SupabaseGuidelineRepository,
};

const GuidelineAdapterProvider = {
  provide: GUIDELINE_TOKEN,
  useClass: GuidelineAdapter,
};

@Module({
  imports: [SharedModule],
  controllers: [GuidelinePostController],
  providers: [
    GuidelineSagas,
    GuidelineCreateCommandHandler,
    GuidelineRepositoryProvider,
    GuidelineEmbedCommandHandler,
    GuidelineSemanticReadQueryHandler,
    GuidelineAdapterProvider,
  ],
  exports: [GUIDELINE_TOKEN],
})
export class GuidelineModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
