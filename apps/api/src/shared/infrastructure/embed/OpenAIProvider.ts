import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

export const OpenAIProvider = {
  provide: OpenAI,
  useFactory: (configService: ConfigService) => {
    return new OpenAI({
      apiKey: configService.get('OPENAI_API_KEY') as string,
    });
  },
  inject: [ConfigService],
};
