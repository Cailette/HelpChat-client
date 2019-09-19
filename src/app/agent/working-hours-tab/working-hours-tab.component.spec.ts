import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingHoursTabComponent } from './working-hours-tab.component';

describe('WorkingHoursTabComponent', () => {
  let component: WorkingHoursTabComponent;
  let fixture: ComponentFixture<WorkingHoursTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingHoursTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingHoursTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
