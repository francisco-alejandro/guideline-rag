import { Command } from '~shared/domain';

type GuidelineSemanticReadQueryData = {
  content: string;
};

export class GuidelineSemanticReadQuery extends Command<GuidelineSemanticReadQueryData> {}
