import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitTableComponent } from './habit-table.component';

describe('HabitTableComponent', () => {
  let component: HabitTableComponent;
  let fixture: ComponentFixture<HabitTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
