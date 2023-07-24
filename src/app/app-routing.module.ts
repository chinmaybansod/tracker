import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservoirComponent } from './reservoir/reservoir.component';
import { CoWinComponent } from './co-win/co-win.component';

const routes: Routes = [
  {
    path: '',
    component: ReservoirComponent
  },
  {
    path: 'covid',
    component: CoWinComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
