import { Event, Id } from '~shared/domain';

type GuidelineCreatedEventData = {
  title: string;
  content: string;
  tags: string[];
  active: boolean;
};

export class GuidelineCreatedEvent extends Event<GuidelineCreatedEventData> {
  constructor(aggregateRootId: Id, data: GuidelineCreatedEventData) {
    super('guideline.created', aggregateRootId.value, data);
  }
}
