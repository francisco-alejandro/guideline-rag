import { SupabaseEventRepository } from '~shared/infrastructure/persistence/SupabaseEventRepository';
import { Event } from '~shared/domain';

describe('SupabaseEventRepository', () => {
  let repository: SupabaseEventRepository;
  let mockSupabaseClient: any;

  beforeEach(() => {
    // Create a mock Supabase client
    mockSupabaseClient = {
      from: jest.fn().mockReturnThis(),
      insert: jest.fn(),
    };

    // Create repository instance with mocked client
    repository = new SupabaseEventRepository(mockSupabaseClient);
  });

  describe('save', () => {
    it('should successfully save an event to Supabase', async () => {
      const mockEvent = {
        id: 'test-event-id',
        topic: 'test.topic',
        aggregateRootId: 'test-aggregate-id',
        data: { message: 'test data' },
      } as Event;

      const mockSupabaseResponse = {
        error: null,
      };

      mockSupabaseClient.insert.mockResolvedValue(mockSupabaseResponse);

      await repository.save(mockEvent);

      expect(mockSupabaseClient.from).toHaveBeenCalledWith('events');
      expect(mockSupabaseClient.insert).toHaveBeenCalledWith({
        id: mockEvent.id,
        topic: mockEvent.topic,
        aggregate_root_id: mockEvent.aggregateRootId,
        data: mockEvent.data,
      });
    });

    it('should throw an error when Supabase returns an error', async () => {
      // Arrange
      const mockEvent = {
        id: 'test-event-id',
        topic: 'test.topic',
        aggregateRootId: 'test-aggregate-id',
        data: { message: 'test data' },
      } as Event;

      const mockSupabaseResponse = {
        error: {
          message: 'Database connection failed',
          code: 'CONNECTION_ERROR',
        },
      };

      mockSupabaseClient.insert.mockResolvedValue(mockSupabaseResponse);

      // Act & Assert
      await expect(repository.save(mockEvent)).rejects.toThrow(
        'Database connection failed',
      );

      expect(mockSupabaseClient.from).toHaveBeenCalledWith('events');
      expect(mockSupabaseClient.insert).toHaveBeenCalledWith({
        id: mockEvent.id,
        topic: mockEvent.topic,
        aggregate_root_id: mockEvent.aggregateRootId,
        data: mockEvent.data,
      });
    });
  });
});
