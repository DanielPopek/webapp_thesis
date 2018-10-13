import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDeleteDialogComponent } from './application-delete-dialog.component';

describe('ApplicationDeleteDialogComponent', () => {
  let component: ApplicationDeleteDialogComponent;
  let fixture: ComponentFixture<ApplicationDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
