import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GuidelineSemanticReadQuery } from './read/GuidelineSemanticReadQuery';

@Injectable()
export class GuidelineAdapter {
  constructor(private readonly queryBus: QueryBus) {}

  async read(content: string) {
    const query = new GuidelineSemanticReadQuery({
      content,
    });

    return this.queryBus.execute(query);
  }
}
