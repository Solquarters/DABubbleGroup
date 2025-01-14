import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingFunctionsDialogComponent } from './testing-functions-dialog.component';

describe('TestingFunctionsDialogComponent', () => {
  let component: TestingFunctionsDialogComponent;
  let fixture: ComponentFixture<TestingFunctionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingFunctionsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingFunctionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
