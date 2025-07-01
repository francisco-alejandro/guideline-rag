import { Container } from "inversify";
import { container as sharedContainer } from "../shared/container";
import { HttpMessageService } from "./infrastructure";
import { MessageService } from "./domain";

const container = new Container({ parent: sharedContainer });

container.bind<MessageService>("message.service").to(HttpMessageService);

export { container };
