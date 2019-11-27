import { TableData } from './../models/table-data.interface';

import { Action } from '@ngrx/store';

export enum FeatureComponentActionTypes {
  SetTargetValue = '[Feature Component] Set Target Value',
  SetTableData = '[Feature Component] Set Table Data'
}

export class SetTargetValue implements Action {
  readonly type = FeatureComponentActionTypes.SetTargetValue;
  constructor(public payload: {criterionId: string, targetId: string, cellValue: boolean}) { }
}
export class SetTableData implements Action {
  readonly type = FeatureComponentActionTypes.SetTableData;
  constructor(public payload: TableData) { }
}

export type FeatureComponentActions =
  SetTargetValue |
  SetTableData;
