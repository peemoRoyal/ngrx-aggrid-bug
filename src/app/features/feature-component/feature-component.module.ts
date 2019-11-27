import { AgGridModule } from '@ag-grid-community/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureComponentComponent } from './feature-component.component';
import { GridComponent } from './grid/grid.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/feature-component.reducer';


@NgModule({
  declarations: [
    FeatureComponentComponent,
    GridComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    StoreModule.forFeature('feature-component', reducer),
  ],
  exports: [
    FeatureComponentComponent
  ]
})
export class FeatureComponentModule { }
