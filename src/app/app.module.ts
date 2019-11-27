import { environment } from './../environments/environment';
import { FeatureComponentComponent } from './features/feature-component/feature-component.component';
import { FeatureComponentModule } from './features/feature-component/feature-component.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AgGridModule } from '@ag-grid-community/angular';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FeatureComponentModule,
    StoreModule.forRoot({}),
    AgGridModule.withComponents([]),
    StoreDevtoolsModule.instrument({
      name: 'Store App Devtools',
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
