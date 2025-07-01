import { ResponseService } from '~shared/domain';
import { OpenAI } from 'openai';
import { Inject } from '@nestjs/common';

export class OpenAIResponseService implements ResponseService {
  constructor(@Inject(OpenAI) private readonly client: OpenAI) {}

  async send(
    message: string,
    instructions: string,
    model: string = 'gpt-4.1-nano',
  ): Promise<string> {
    const response = await this.client.responses.create({
      model,
      instructions,
      input: message,
    });

    return response.output_text || '';
  }
}
