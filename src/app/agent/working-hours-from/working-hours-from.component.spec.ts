import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingHoursFromComponent } from './working-hours-from.component';

describe('WorkingHoursFromComponent', () => {
  let component: WorkingHoursFromComponent;
  let fixture: ComponentFixture<WorkingHoursFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingHoursFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingHoursFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
