import { Message, MessageService } from "../../domain";
import { Settings } from "../../../shared";
import { inject, injectable } from "inversify";

type MessageResponseDTO = {
  id: string;
  role: string;
  chatId: string;
  turnId: string;
  content: string;
};

@injectable()
class HttpMessageService implements MessageService {
  constructor(@inject("settings") private readonly settings: Settings) {}

  async create(content: string): Promise<Message> {
    const response = await fetch(`${this.settings.apiHost}/messages`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error("Failed to create message");
    }

    const data: MessageResponseDTO = await response.json();

    return data as Message;
  }
}

export { HttpMessageService };
