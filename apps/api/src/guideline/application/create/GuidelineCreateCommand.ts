import { Command } from '~shared/domain';

type GuidelineCreateCommandData = {
  title: string;
  content: string;
  tags: string[];
};

export class GuidelineCreateCommand extends Command<GuidelineCreateCommandData> {}
