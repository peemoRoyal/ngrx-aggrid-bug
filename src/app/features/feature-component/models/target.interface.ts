export interface Target {
  readonly name: string;
  readonly type: string;
  blocked: boolean;
  id?: string;
  criterionId: string;
}
