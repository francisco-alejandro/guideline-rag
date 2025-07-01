import { Exclude } from 'class-transformer';

export abstract class BaseSerializer {
  @Exclude()
  events: any[] = [];
}
