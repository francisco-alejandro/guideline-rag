import { Event, Id } from '~shared/domain';

type MessageEmbeddedEventData = {
  vector: number[];
};

export class MessageEmbeddedEvent extends Event<MessageEmbeddedEventData> {
  constructor(aggregateRootId: Id, data: MessageEmbeddedEventData) {
    super('message.embedded', aggregateRootId.value, data);
  }
}
