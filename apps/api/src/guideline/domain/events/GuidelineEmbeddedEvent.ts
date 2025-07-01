import { Event, Id } from '~shared/domain';

type GuidelineEmbeddedEventData = {
  vector: number[];
};

export class GuidelineEmbeddedEvent extends Event<GuidelineEmbeddedEventData> {
  constructor(aggregateRootId: Id, data: GuidelineEmbeddedEventData) {
    super('guideline.embedded', aggregateRootId.value, data);
  }
}
