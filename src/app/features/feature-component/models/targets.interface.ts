import { Target } from './target.interface';

export interface Targets {
  byId: {
    [key: string]: Target;
  };
  allIds: string[];
}

