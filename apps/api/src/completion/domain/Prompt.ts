import { Message } from './Message';

const DEFAULT_INSTRUCTION =
  'You are a senior developer assistant. Provide clear, accurate, and helpful responses with expert-level technical guidance.';

const generateInstructions = (guidelines: string[]): string => {
  if (!guidelines || !guidelines.length) {
    return DEFAULT_INSTRUCTION;
  }

  const formattedGuidelines = guidelines
    .map((guideline, index) => `${index + 1}. ${guideline}`)
    .join('\n');

  return `${DEFAULT_INSTRUCTION}\n${formattedGuidelines}`;
};

const generateFewShotExamples = (messages: Message[]): string => {
  const groupedMessages = messages.reduce((acc, message) => {
    const turnId = message.turnId.value;

    if (!acc.has(turnId)) {
      acc.set(turnId, []);
    }

    acc.get(turnId)?.push(message);

    return acc;
  }, new Map<string, Message[]>());

  const examples: string[] = [];

  for (const [, messages] of groupedMessages) {
    const userMessage = messages.find((m) => m.role === 'user');
    const assistantMessage = messages.find((m) => m.role === 'assistant');

    if (userMessage && assistantMessage) {
      examples.push(`User: ${userMessage.content}`);
      examples.push(`Assistant: ${assistantMessage.content}`);
    }
  }

  return examples.join('\n');
};

export class Prompt {
  constructor(
    public readonly instructions: string,
    public readonly input: string,
  ) {}

  static create(
    content: string,
    messages: Message[],
    guidelines: string[],
  ): Prompt {
    const instructions = generateInstructions(guidelines);
    const fewShotExamples = generateFewShotExamples(messages);

    const input = `${content}\n\n Given the following examples:\n${fewShotExamples}`;

    return new Prompt(instructions, input);
  }
}
