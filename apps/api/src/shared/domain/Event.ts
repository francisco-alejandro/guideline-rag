import { Id } from '~shared/domain';

export interface EventMetadata {
  userId?: string;
  correlationId?: string;
  causationId?: string;
  [key: string]: unknown;
}

abstract class Event<T = unknown> {
  public id: string;
  public version: number;
  public timestamp: Date;
  public metadata: EventMetadata;

  constructor(
    public topic: string,
    public aggregateRootId: string,
    public data: T,
  ) {
    this.id = Id.generate().value;
  }
}

export { Event };
