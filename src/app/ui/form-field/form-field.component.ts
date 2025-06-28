import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, inject, input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { InputComponent } from '../input/input.component';

export interface FormFieldProps {
  label?: string;
  hint?: string;
  required?: boolean;
  class?: string;
}

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, InputComponent],
  templateUrl: './form-field.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true,
    },
  ],
})
export class FormFieldComponent implements ControlValueAccessor {
  label = input<string>();

  hint = input<string>();

  required = input<boolean>(false);

  class = input<string>('');

  control = input<AbstractControl | FormControl | null>();

  // Input component properties to pass through
  type = input<'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'>('text');

  size = input<'sm' | 'default' | 'lg'>('default');

  placeholder = input<string>('');

  disabled = input<boolean>(false);

  readonly = input<boolean>(false);

  loading = input<boolean>(false);

  leftIcon = input<boolean>(false);

  rightIcon = input<boolean>(false);

  showPasswordToggle = input<boolean>(false);

  clearable = input<boolean>(false);

  autoComplete = input<string>('');

  maxLength = input<number>();

  minLength = input<number>();

  pattern = input<string>();

  private cdr = inject(ChangeDetectorRef);

  private onChange = (_value: string) => {};

  private onTouched = () => {};

  value = '';

  onInputChange(value: string): void {
    this.value = value;
    this.onChange(value);
  }

  onInputBlur(): void {
    this.onTouched();
  }

  get containerClasses(): string {
    const baseClasses = 'space-y-2';
    return `${baseClasses} ${this.class() || ''}`;
  }

  get labelClasses(): string {
    return 'text-sm font-medium text-foreground';
  }

  get hintClasses(): string {
    return 'text-xs text-muted-foreground';
  }

  get errorClasses(): string {
    return 'text-xs text-destructive flex items-center gap-1 mt-1';
  }

  get hasErrors(): boolean {
    return !!(this.control()?.invalid && this.control()?.touched);
  }

  get errorMessages(): string[] {
    if (!this.control()?.errors || !this.hasErrors) {
      return [];
    }

    const errors: string[] = [];
    const controlErrors = this.control()?.errors;

    if (!controlErrors) {
      return [];
    }

    if (controlErrors.required) {
      errors.push(`${this.label() || 'This field'} is required`);
    }

    if (controlErrors.email) {
      errors.push('Please enter a valid email address');
    }

    if (controlErrors.minlength) {
      const minlengthError = controlErrors.minlength as { requiredLength: number };
      errors.push(`Must be at least ${minlengthError.requiredLength} characters long`);
    }

    if (controlErrors.maxlength) {
      const maxlengthError = controlErrors.maxlength as { requiredLength: number };
      errors.push(`Must be no more than ${maxlengthError.requiredLength} characters long`);
    }

    if (controlErrors.pattern) {
      errors.push('Invalid format');
    }

    if (controlErrors.min) {
      const minError = controlErrors.min as { min: number };
      errors.push(`Must be at least ${minError.min}`);
    }

    if (controlErrors.max) {
      const maxError = controlErrors.max as { max: number };
      errors.push(`Must be no more than ${maxError.max}`);
    }

    // Handle custom error messages
    Object.keys(controlErrors).forEach((key) => {
      if (!['required', 'email', 'minlength', 'maxlength', 'pattern', 'min', 'max'].includes(key)) {
        const error = controlErrors[key] as unknown;
        if (typeof error === 'string') {
          errors.push(error);
        } else if (
          error &&
          typeof error === 'object' &&
          'message' in error &&
          typeof error.message === 'string'
        ) {
          errors.push(error.message);
        }
      }
    });

    return errors;
  }

  get inputVariant(): 'default' | 'error' | 'success' {
    if (this.hasErrors) {
      return 'error';
    }
    return 'default';
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || '';
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(_isDisabled: boolean): void {
    // Note: Since disabled is now a signal input, we cannot directly set it
    // The parent component should manage the disabled state through the input binding
    this.cdr.markForCheck();
  }
}
