import { Inject } from '@nestjs/common';
import { EventBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GuidelineRepository } from '~guideline/domain';
import { GuidelineEmbedCommand } from './GuidelineEmbedCommand';
import { EmbedService } from '~shared/domain';

@CommandHandler(GuidelineEmbedCommand)
export class GuidelineEmbedCommandHandler
  implements ICommandHandler<GuidelineEmbedCommand>
{
  constructor(
    @Inject(EventBus) private bus: EventBus,
    @Inject(GuidelineRepository) private repository: GuidelineRepository,
    @Inject(EmbedService) private embedService: EmbedService,
  ) {}

  async execute(command: GuidelineEmbedCommand): Promise<void> {
    const { id: guidelineId, content } = command.data;

    const embedding = await this.embedService.embed(content);

    const guideline = await this.repository.findById(guidelineId);
    if (!guideline) {
      return;
    }

    guideline.embed(embedding);

    await this.repository.save(guideline);

    for (const event of guideline.pullDomainEvents()) {
      this.bus.publish(event);
    }
  }
}
