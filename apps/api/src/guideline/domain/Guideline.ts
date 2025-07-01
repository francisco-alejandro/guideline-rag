import { AggregateRoot, Id } from '~shared/domain';
import {
  GuidelineCreatedEvent,
  GuidelineEmbeddedEvent,
} from '~guideline/domain/events';

class Guideline extends AggregateRoot {
  constructor(
    public id: Id,
    public title: string,
    public content: string,
    public tags: string[],
    public vector: number[] | null,
    public active: boolean = true,
  ) {
    super();
  }

  static create(
    id: Id,
    title: string,
    content: string,
    tags: string[],
  ): Guideline {
    const guideline = new Guideline(id, title, content, tags, null, true);

    guideline.record(
      new GuidelineCreatedEvent(id, {
        title: guideline.title,
        content: guideline.content,
        tags: guideline.tags,
        active: true,
      }),
    );

    return guideline;
  }

  embed(vector: number[]): void {
    this.vector = vector;

    this.record(
      new GuidelineEmbeddedEvent(this.id, {
        vector: this.vector,
      }),
    );
  }
}

export { Guideline };
