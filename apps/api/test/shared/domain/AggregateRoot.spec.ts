import { AggregateRoot, Event, Id } from '~shared/domain';

class TestAggregateRoot extends AggregateRoot {
  id: string;

  constructor() {
    super();
    this.id = Id.generate().value;
  }
}

class TestEvent extends Event<{ message: string }> {}

describe('AggregateRoot', () => {
  const event = new TestEvent('test.event', 'id', {
    message: 'message',
  });

  let aggregateRoot: TestAggregateRoot;

  beforeEach(() => {
    aggregateRoot = new TestAggregateRoot();
  });

  it('should add an event to the events array', () => {
    aggregateRoot.record(event);

    const events = aggregateRoot.pullDomainEvents();

    expect(events).toHaveLength(1);
    expect(events[0]).toBe(event);
  });

  it('should clear events array after pulling events', () => {
    aggregateRoot.record(event);

    expect(aggregateRoot.pullDomainEvents()).toHaveLength(1);

    expect(aggregateRoot.pullDomainEvents()).toHaveLength(0);
  });
});
