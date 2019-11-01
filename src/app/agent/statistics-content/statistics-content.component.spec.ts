import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsContentComponent } from './statistics-content.component';

describe('StatisticsContentComponent', () => {
  let component: StatisticsContentComponent;
  let fixture: ComponentFixture<StatisticsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
