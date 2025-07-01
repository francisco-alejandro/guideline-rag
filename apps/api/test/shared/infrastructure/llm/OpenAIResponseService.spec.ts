import { OpenAIResponseService } from '~shared/infrastructure/llm/OpenAIResponseService';
import { OpenAI } from 'openai';

describe('OpenAIResponseService', () => {
  let service: OpenAIResponseService;
  let mockOpenAIClient: jest.Mocked<OpenAI>;

  beforeEach(() => {
    mockOpenAIClient = {
      responses: {
        create: jest.fn(),
      },
    } as unknown as jest.Mocked<OpenAI>;

    service = new OpenAIResponseService(mockOpenAIClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('send', () => {
    it('should send a message and return the response text', async () => {
      const message = 'Hello, how are you?';
      const instructions = 'You are a helpful assistant.';
      const expectedResponse = 'I am doing well, thank you for asking!';

      (mockOpenAIClient.responses.create as jest.Mock).mockResolvedValue({
        output_text: expectedResponse,
      });

      const result = await service.send(message, instructions);

      expect(mockOpenAIClient.responses.create).toHaveBeenCalledWith({
        model: 'gpt-4.1-nano',
        instructions,
        input: message,
      });

      expect(result).toBe(expectedResponse);
    });

    it('should use default model when no model is provided', async () => {
      const message = 'Test message';
      const instructions = 'Test instructions';

      (mockOpenAIClient.responses.create as jest.Mock).mockResolvedValue({
        output_text: 'Test response',
      });

      await service.send(message, instructions);

      expect(mockOpenAIClient.responses.create).toHaveBeenCalledWith({
        model: 'gpt-4.1-nano',
        instructions,
        input: message,
      });
    });

    it('should use custom model when provided', async () => {
      const message = 'Test message';
      const instructions = 'Test instructions';
      const customModel = 'gpt-4-turbo';

      (mockOpenAIClient.responses.create as jest.Mock).mockResolvedValue({
        output_text: 'Test response',
      });

      await service.send(message, instructions, customModel);

      expect(mockOpenAIClient.responses.create).toHaveBeenCalledWith({
        model: customModel,
        instructions,
        input: message,
      });
    });

    it('should return empty string when response has no output_text', async () => {
      const message = 'Test message';
      const instructions = 'Test instructions';

      (mockOpenAIClient.responses.create as jest.Mock).mockResolvedValue({
        output_text: null,
      });

      const result = await service.send(message, instructions);

      expect(result).toBe('');
    });
  });
});
