import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  changePageBool = 'rainfall';

  toggle(value: string) {
    this.changePageBool = value;
  }
}
