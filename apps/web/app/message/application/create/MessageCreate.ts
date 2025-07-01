import { inject, injectable } from "inversify";
import { MessageCreateUseCase, Message } from "../../domain";
import type { MessageService } from "../../domain";

@injectable()
export class MessageCreate implements MessageCreateUseCase {
  constructor(
    @inject("message.service") private readonly messageService: MessageService
  ) {}

  async execute(content: string): Promise<Message> {
    return this.messageService.create(content);
  }
}
