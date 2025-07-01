export const ResponseService = Symbol('ResponseService');

export interface ResponseService {
  send(message: string, instructions: string): Promise<string>;
}
