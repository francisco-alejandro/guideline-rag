import { Container } from "inversify";
import { container as sharedContainer } from "../shared/container";
import { HttpMessageService } from "./infrastructure/network";
import { MessageService, MessageCreateUseCase } from "./domain";
import { MessageCreate } from "./application/create";

const container = new Container({ parent: sharedContainer });

container.bind<MessageService>("message.service").to(HttpMessageService);
container.bind<MessageCreateUseCase>("message.create").to(MessageCreate);

export { container };
