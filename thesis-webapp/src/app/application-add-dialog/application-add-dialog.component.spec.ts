import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationAddDialogComponent } from './application-add-dialog.component';

describe('ApplicationAddDialogComponent', () => {
  let component: ApplicationAddDialogComponent;
  let fixture: ComponentFixture<ApplicationAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
