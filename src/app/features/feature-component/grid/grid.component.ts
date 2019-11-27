import { TableData } from './../models/table-data.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {AllCommunityModules} from '@ag-grid-community/all-modules';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})

export class GridComponent implements OnInit {

  @Input() tableData: TableData;
  modules = AllCommunityModules;
  @Output() cellValueChanged = new EventEmitter<{criterionId: string, targetId: string, cellValue: boolean}>();

  public defaultColDef;
  public getRowNodeId;

  constructor() {
    this.defaultColDef = {
      sortable: true,
      unSortIcon: true,
      resizable: true
    };
    this.getRowNodeId = (data) => {
      return data.criterionValue;
    };
  }

  ngOnInit() {
  }


  onGridReady(params: any) {
   setTimeout(() => {
    params.api.sizeColumnsToFit();
    }, 100);
  }

  cellClicked(event) {
    this.cellValueChanged.emit({
      criterionId: event.data.criterionValue,
      targetId: event.colDef.field,
      cellValue: !event.value
     });
  }

}
