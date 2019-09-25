import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRateComponent } from './chat-rate.component';

describe('ChatRateComponent', () => {
  let component: ChatRateComponent;
  let fixture: ComponentFixture<ChatRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
