import { Transform, Exclude } from 'class-transformer';
import { Id } from '~shared/domain';
import { BaseSerializer } from '~shared/infrastructure/serializer';
import { Message, Role } from '~completion/domain';

export class MessageSerializer extends BaseSerializer {
  @Transform(({ value: id }: { value: Id }) => id.value)
  id: Id;
  role: Role;
  @Transform(({ value: id }: { value: Id }) => id.value)
  chatId: Id;
  @Transform(({ value: id }: { value: Id }) => id.value)
  turnId: Id;
  content: string;
  @Exclude()
  vector: number[] | null;

  constructor(partial: Partial<Message>) {
    super();
    Object.assign(this, partial);
  }
}
