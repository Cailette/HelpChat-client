import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChattingWindowComponent } from './chatting-window.component';

describe('ChattingWindowComponent', () => {
  let component: ChattingWindowComponent;
  let fixture: ComponentFixture<ChattingWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChattingWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChattingWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
