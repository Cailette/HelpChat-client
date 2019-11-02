import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsTableComponent } from './statistics-table.component';

describe('StatisticsTableComponent', () => {
  let component: StatisticsTableComponent;
  let fixture: ComponentFixture<StatisticsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
