import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationAddDialogComponent } from './conversation-add-dialog.component';

describe('ConversationAddDialogComponent', () => {
  let component: ConversationAddDialogComponent;
  let fixture: ComponentFixture<ConversationAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
