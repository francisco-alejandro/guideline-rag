import { Command, Id } from '~shared/domain';

type GuidelineEmbedCommandData = {
  id: Id;
  content: string;
};

export class GuidelineEmbedCommand extends Command<GuidelineEmbedCommandData> {}
