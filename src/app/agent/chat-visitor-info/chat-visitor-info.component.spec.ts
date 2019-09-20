import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatVisitorInfoComponent } from './chat-visitor-info.component';

describe('ChatVisitorInfoComponent', () => {
  let component: ChatVisitorInfoComponent;
  let fixture: ComponentFixture<ChatVisitorInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatVisitorInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatVisitorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
