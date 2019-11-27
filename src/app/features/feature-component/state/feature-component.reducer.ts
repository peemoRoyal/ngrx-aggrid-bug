import { FeatureComponentActions, FeatureComponentActionTypes } from './feature-component.actions';
import { createFeatureSelector, createSelector, State } from '@ngrx/store';

import { TableData } from '../models/table-data.interface';

import targets from '../../../data/targets.json';
import criteria from '../../../data/criteria.json';
import tableData from '../../../data/tableData.json';

export interface State {
  app: any;
  featureComponent: FeatureComponentState;
}
export interface FeatureComponentState{
  tableData: TableData;
  targets: any;
  criteria: any;
}

const initialState: FeatureComponentState = {
  tableData,
  targets,
  criteria
};

const getFeatureComponentFeatureState = createFeatureSelector<FeatureComponentState>('feature-component');

export const getCriteria = createSelector(
  getFeatureComponentFeatureState,
  state => {console.log(state); return state.criteria;}
);
export const getTargets = createSelector(
  getFeatureComponentFeatureState,
  state => state.targets
);
export const getTableData = createSelector(
  getFeatureComponentFeatureState,
  state => state.tableData
);

export function reducer(state = initialState, action: FeatureComponentActions): FeatureComponentState {
  switch (action.type) {
    case FeatureComponentActionTypes.SetTargetValue:
      console.log('setTargetValue', action.payload);

      const targetId = `target_${action.payload.criterionId}_${action.payload.targetId}`;
      const updatedTargets = {
        ... state.targets,
        byId: {
          ... state.targets.byId,
          [targetId]: {
            ... state.targets.byId[targetId],
            blocked: action.payload.cellValue}
        }
      };
      return {
        ...state,
        targets: updatedTargets
      };

    case FeatureComponentActionTypes.SetTableData:
      console.log('SetTableData', action.payload);

      return {
        ...state,
        tableData: {...action.payload}
      };

    default:
      return state;
  }
}
