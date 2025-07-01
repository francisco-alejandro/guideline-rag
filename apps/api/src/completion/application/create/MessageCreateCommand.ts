import { Message } from '~completion/domain';
import { Command } from '~shared/domain';

type MessageCreateCommandData = {
  chatId?: string;
  content: string;
  messages: Message[];
  guidelines: string[];
};

export class MessageCreateCommand extends Command<MessageCreateCommandData> {}
