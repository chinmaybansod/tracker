import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWinComponent } from './co-win.component';

describe('CoWinComponent', () => {
  let component: CoWinComponent;
  let fixture: ComponentFixture<CoWinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoWinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
