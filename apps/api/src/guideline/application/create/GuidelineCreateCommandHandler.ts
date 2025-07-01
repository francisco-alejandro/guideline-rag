import { Inject } from '@nestjs/common';
import { EventBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Guideline, GuidelineRepository } from '~guideline/domain';
import { GuidelineCreateCommand } from './GuidelineCreateCommand';
import { Id } from '~shared/domain';

@CommandHandler(GuidelineCreateCommand)
export class GuidelineCreateCommandHandler
  implements ICommandHandler<GuidelineCreateCommand>
{
  constructor(
    @Inject(EventBus) private bus: EventBus,
    @Inject(GuidelineRepository) private repository: GuidelineRepository,
  ) {}

  async execute(command: GuidelineCreateCommand): Promise<void> {
    const { title, content, tags } = command.data;

    const guideline = Guideline.create(Id.generate(), title, content, tags);

    await this.repository.save(guideline);

    for (const event of guideline.pullDomainEvents()) {
      this.bus.publish(event);
    }
  }
}
