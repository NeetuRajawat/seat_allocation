import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatArrangementsComponent } from './seat-arrangements.component';

describe('SeatArrangementsComponent', () => {
  let component: SeatArrangementsComponent;
  let fixture: ComponentFixture<SeatArrangementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatArrangementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatArrangementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
