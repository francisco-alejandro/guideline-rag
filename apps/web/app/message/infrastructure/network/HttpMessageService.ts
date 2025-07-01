import { Message, MessageService } from "../../domain";

class HttpMessageService implements MessageService {
  async create(message: Message): Promise<Message> {
    return message;
  }
}

export { HttpMessageService };
