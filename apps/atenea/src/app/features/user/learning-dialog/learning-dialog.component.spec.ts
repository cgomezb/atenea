import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningDialogComponent } from './learning-dialog.component';

describe('LearningDialogComponent', () => {
  let component: LearningDialogComponent;
  let fixture: ComponentFixture<LearningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
