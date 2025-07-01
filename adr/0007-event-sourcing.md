# ADR-0007: Event Sourcing

## Title

Event Sourcing

## Status

Accepted

## Context

Our domain entities undergo various state changes throughout their lifecycle. We need to ensure:

- **Traceability**: Complete audit trail of all changes to domain entities
- **Debugging**: Understand the sequence of events that led to current state
- **Integration**: Support for CQRS pattern and event-driven architecture

Traditional CRUD approaches only store the current state, making it difficult to understand how an entity reached its current state or recover from data corruption.

## Decision

We will implement Event Sourcing pattern where:

1. **Event Storage**: Every change to a domain entity is stored as an immutable event
2. **Event Handlers**: Events trigger side effects and update read models for CQRS
3. **Business Logic**: Events can trigger business processes like transactional emails, notifications, and integrations

## Consequences

### Positive

- **State Reconstruction**: Rebuild entity state at any point in time
- **Debugging**: Easy to understand how entities reached their current state
- **CQRS Integration**: Natural fit with command-query responsibility segregation
- **Business Process Automation**: Events can trigger transactional emails, notifications, and integrations
- **Scalability**: Events can be processed asynchronously for better performance

### Negative

- **Complexity**: Additional architectural complexity and learning curve
- **Storage Overhead**: Events require more storage than current state only
- **Performance**: Event replay can be slow for entities with many events
- **Query Complexity**: Complex queries require event processing or read models
- **Development Overhead**: More code to maintain and test

### Neutral

- **Learning Curve**: Team needs to understand event sourcing patterns

### Storage Options

- **PostgreSQL**: Reliable and ACID compliant, good for smaller event stores
- **MongoDB**: Document-based storage for flexible event schemas

### Event Schema

- **Event ID**: Unique identifier for each event (auto-generated)
- **Topic**: Event topic/name for routing and categorization
- **Aggregate Root ID**: Identifier of the entity the event belongs to
- **Event Data**: Serialized event payload (generic type T)

## Integration with CQRS

Event Sourcing naturally complements CQRS by:

- Providing the event stream for read model updates
- Enabling eventual consistency between command and query sides
- Supporting multiple read models from the same event stream
- Allowing independent scaling of event processing

## References

- [Event Sourcing Pattern](https://martinfowler.com/eaaDev/EventSourcing.html)
- [EventStoreDB Documentation](https://developers.eventstore.com/)
- [Apache Kafka Documentation](https://kafka.apache.org/documentation/)
- [PostgreSQL Event Sourcing](https://www.postgresql.org/docs/)
- [CQRS and Event Sourcing](https://martinfowler.com/bliki/CQRS.html)
