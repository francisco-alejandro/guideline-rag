import { Message } from "./Message";

export interface MessageService {
  create(message: Message): Promise<Message>;
}
