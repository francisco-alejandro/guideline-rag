import { Message } from "./Message";

export interface MessageService {
  create(content: string): Promise<Message>;
}
