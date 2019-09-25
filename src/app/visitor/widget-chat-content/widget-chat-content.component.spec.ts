import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetChatContentComponent } from './widget-chat-content.component';

describe('WidgetChatContentComponent', () => {
  let component: WidgetChatContentComponent;
  let fixture: ComponentFixture<WidgetChatContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetChatContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetChatContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
