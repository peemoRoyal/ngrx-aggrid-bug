import { TableData } from './models/table-data.interface';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Criteria } from './models/criteria.interface';
import { Targets } from './models/targets.interface';
import { takeWhile, switchMap, first, tap } from 'rxjs/operators';

import targets from '../../data/targets.json';
import criteria from '../../data/criteria.json';
import tableData from '../../data/tableData.json';

import * as fromFeatureComponent from './state/feature-component.reducer';
import * as featureComponentActions from './state/feature-component.actions';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-feature-component',
  templateUrl: './feature-component.component.html',
  styleUrls: ['./feature-component.component.css']
})

export class FeatureComponentComponent implements OnInit {

  targets: Targets;
  criteria: Criteria;
  tableData;

  selectedTarget = 'V';
  selectedCriterion = 'C_FARBE';

  private componentAlive = true;

  constructor(private store: Store<fromFeatureComponent.FeatureComponentState>) {
    // this.targets = targets;
    // this.criteria = criteria;
    // this.tableData = tableData;
  }

  ngOnInit() {
    // * criteria
    this.store.pipe(
      select(fromFeatureComponent.getCriteria),
      takeWhile(() => this.componentAlive)
    ).subscribe( criteria => {
        this.criteria = criteria;
        // console.log(JSON.stringify(this.criteria))
        if (this.criteria) {
        }
     });

    // * targets
    this.store.pipe(
      select(fromFeatureComponent.getTargets),
      takeWhile(() => this.componentAlive)
    ).subscribe( targets => {
      this.targets = targets;
      if (this.targets) {
        // console.log(JSON.stringify(this.targets))
        this.setTableData();
      }
     });

    this.store.pipe(
        select(fromFeatureComponent.getTableData),
        takeWhile(() => this.componentAlive),
      ).subscribe(tableData => {
      this.tableData = tableData;
    });
  }

  cellValueChanged(data: {criterionId: string, targetId: string, cellValue: boolean}) {
    this.store.dispatch(new featureComponentActions.SetTargetValue(data));
  }

  private setTableData() {
    if (!this.targets || !this.selectedTarget) {
      return;
    }
    const columnDefs = [];
    columnDefs.push( { headerName: 'Criterion', field: 'criterionValue' } );
    const rowData = [];

    const targetNamesInRow = [];

    const filteredCriteria = [... Object.values(this.criteria.byId).filter(criterion =>  criterion.type === this.selectedCriterion)];
    filteredCriteria.map(criterion => {
      const targetsForCriterionId =  Object.values(this.targets.byId)
      .filter(targetsToFilter => targetsToFilter.criterionId === criterion.id);

      const rowDatum = {};
      const criterionValueKey = 'criterionValue';
      const criterionTypeKey = 'criterionType';
      rowDatum[criterionValueKey] = criterion.id;
      rowDatum[criterionTypeKey] = undefined;

      targetsForCriterionId.map(target => {

        const targetNameKey = `${target.name}`;
        targetNamesInRow.push(targetNameKey);

        rowDatum[targetNameKey] = target.blocked;
        const targetTypeKey = 'targetType';
        rowDatum[targetTypeKey] = target.type;

        // Setting ColumnDefs dynamically
        if (target.type === this.selectedTarget &&
          !columnDefs.some(column => column.headerName === targetNameKey)) {
            columnDefs.push({
            headerName: targetNameKey,
            field: targetNameKey,
            suppressNavigable: true,
            suppressSizeToFit: true,
            width: 100,
            resizable: false,
            headerClass: 'header-cell-text-centered',
            cellClass: 'no-border',
            cellRendererParams: { }
          });
        }
      });

      rowData.push(rowDatum);
    });

    this.store.dispatch(new featureComponentActions.SetTableData({columnDefs, rowData}));
  }

}
