import { Criterion } from './criterion.interface';
export interface Criteria {
  byId: {
    [key: string]: Criterion;
  };
  allIds: string[];
}