import { Transform, Exclude } from 'class-transformer';
import { Id } from '~shared/domain';
import { Guideline } from '~guideline/domain';
import { BaseSerializer } from '~shared/infrastructure/serializer';

export class GuidelineSerializer extends BaseSerializer {
  @Transform(({ value: id }: { value: Id }) => id.value)
  id: Id;
  title: string;
  content: string;
  tags: string[];
  @Exclude()
  vector: number[];

  constructor(partial: Partial<Guideline>) {
    super();
    Object.assign(this, partial);
  }
}
