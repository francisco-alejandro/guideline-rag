import { Command } from '~shared/domain';

type MessageSemanticReadQueryData = {
  content: string;
};

export class MessageSemanticReadQuery extends Command<MessageSemanticReadQueryData> {}
