import { Injectable } from '@nestjs/common';
import { Saga } from '@nestjs/cqrs';
import { Observable, filter, map } from 'rxjs';
import { GuidelineEmbedCommand } from '~guideline/application/embed/GuidelineEmbedCommand';
import { Event, Id } from '~shared/domain';

type GuidelineCreatedEventData = {
  content: string;
};

@Injectable()
export class GuidelineSagas {
  @Saga()
  guidelineCreatedEventListener = (
    events: Observable<Event>,
  ): Observable<GuidelineEmbedCommand> => {
    return events.pipe(
      filter((event) => {
        return event.topic === 'guideline.created';
      }),
      map((event) => {
        const { aggregateRootId: guidelineId, data } = event;
        const { content } = data as GuidelineCreatedEventData;

        return new GuidelineEmbedCommand({
          id: new Id(guidelineId),
          content,
        });
      }),
    );
  };
}
