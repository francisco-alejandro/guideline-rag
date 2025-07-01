import { Container } from "inversify";
import { settings } from "./Settings";

const container = new Container();

container.bind("settings").toConstantValue(settings);

export { container };
