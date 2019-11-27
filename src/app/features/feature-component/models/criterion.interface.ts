import { Target } from './target.interface';

export interface Criterion {
  value: string;
  type: string;
  targets: Target[];
  id?: string;
}

