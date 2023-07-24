import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoWinComponent } from './co-win/co-win.component';
import { ReservoirComponent } from './reservoir/reservoir.component';

@NgModule({
  declarations: [
    AppComponent,
    CoWinComponent,
    ReservoirComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
