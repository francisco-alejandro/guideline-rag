export const EmbedService = Symbol('EmbedService');

export interface EmbedService {
  embed(text: string): Promise<number[]>;
}
