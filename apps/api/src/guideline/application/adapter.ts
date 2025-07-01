import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GuidelineSemanticReadQuery } from './read/GuidelineSemanticReadQuery';
import { Guideline } from '../domain';

@Injectable()
export class GuidelineAdapter {
  constructor(private readonly queryBus: QueryBus) {}

  async read(content: string): Promise<Guideline[]> {
    const query = new GuidelineSemanticReadQuery({
      content,
    });

    return this.queryBus.execute(query);
  }
}
