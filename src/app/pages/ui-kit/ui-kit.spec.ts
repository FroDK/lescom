import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { UiKitComponent } from './ui-kit';

describe('UiKitComponent', () => {
  let component: UiKitComponent;
  let fixture: ComponentFixture<UiKitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiKitComponent],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(UiKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form controls', () => {
    expect(component.demoForm).toBeDefined();
  });
});
