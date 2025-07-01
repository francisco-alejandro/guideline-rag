import { Id } from '~shared/domain';
import { Guideline } from './Guideline';

export const GuidelineRepository = Symbol('GuidelineRepository');

export interface GuidelineRepository {
  findById(id: Id): Promise<Guideline | null>;
  findByVector(
    embedding: number[],
    threshold: number,
    limit: number,
  ): Promise<Guideline[]>;
  save(guideline: Guideline): Promise<void>;
}
