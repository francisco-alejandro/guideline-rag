import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { GuidelineSemanticReadQuery } from './GuidelineSemanticReadQuery';
import { GuidelineRepository } from '~guideline/domain';
import { EmbedService } from '~shared/domain';
import { Guideline } from '~guideline/domain';

@QueryHandler(GuidelineSemanticReadQuery)
export class GuidelineSemanticReadQueryHandler
  implements IQueryHandler<GuidelineSemanticReadQuery, Guideline[]>
{
  constructor(
    @Inject(GuidelineRepository) private respository: GuidelineRepository,
    @Inject(EmbedService) private embedService: EmbedService,
  ) {}

  async execute(query: GuidelineSemanticReadQuery): Promise<Guideline[]> {
    const { content } = query.data;
    const embedding = await this.embedService.embed(content);

    return this.respository.findByVector(embedding, 0.2, 5);
  }
}
