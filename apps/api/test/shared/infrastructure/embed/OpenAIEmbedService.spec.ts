import { OpenAIEmbedService } from '~shared/infrastructure/embed/OpenAIEmbedService';

describe('OpenAIEmbedService', () => {
  let service: OpenAIEmbedService;
  let mockOpenAI: any;

  beforeEach(() => {
    // Create a simple mock OpenAI instance
    mockOpenAI = {
      embeddings: {
        create: jest.fn(),
      },
    };

    // Create service instance with mock
    service = new OpenAIEmbedService(mockOpenAI);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('embed', () => {
    it('should return embedding array when API call succeeds', async () => {
      const inputText = 'Hello, world!';
      const mockEmbedding = [0.1, 0.2, 0.3, 0.4, 0.5];
      const mockResponse = {
        data: [
          {
            embedding: mockEmbedding,
            index: 0,
            object: 'embedding',
          },
        ],
        model: 'text-embedding-3-small',
        object: 'list',
        usage: {
          prompt_tokens: 4,
          total_tokens: 4,
        },
      };

      mockOpenAI.embeddings.create.mockResolvedValue(mockResponse);

      const result = await service.embed(inputText);

      expect(mockOpenAI.embeddings.create).toHaveBeenCalledWith({
        model: 'text-embedding-3-small',
        input: inputText,
      });

      expect(result).toEqual(mockEmbedding);
    });
  });
});
