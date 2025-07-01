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
    public eventType: string,
    version?: number,
    metadata?: EventMetadata,
  ) {
    this.id = Id.generate().value;
    this.version = version ?? 1;
    this.timestamp = new Date();
    this.metadata = metadata ?? {};
  }
}

export { Event };
