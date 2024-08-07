import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { CoWinComponent } from './co-win/co-win.component';
import { ReservoirComponent } from './reservoir/reservoir.component';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RainfallComponent } from './rainfall/rainfall.component';

@NgModule({
  declarations: [
    AppComponent,
    CoWinComponent,
    ReservoirComponent,
    RainfallComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
