import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  LucideAngularModule,
  Search,
  X,
} from 'lucide-angular';

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'error' | 'success';
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  loading?: boolean;
  required?: boolean;
  leftIcon?: boolean;
  rightIcon?: boolean;
  showPasswordToggle?: boolean;
  clearable?: boolean;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  class?: string;
}

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: InputProps['type'] = 'text';

  @Input() size: InputProps['size'] = 'default';

  @Input() variant: InputProps['variant'] = 'default';

  @Input() value: string = '';

  @Input() placeholder: string = '';

  @Input() disabled: boolean = false;

  @Input() readonly: boolean = false;

  @Input() loading: boolean = false;

  @Input() required: boolean = false;

  @Input() leftIcon: boolean = false;

  @Input() rightIcon: boolean = false;

  @Input() showPasswordToggle: boolean = false;

  @Input() clearable: boolean = false;

  @Input() autoComplete: string = '';

  @Input() maxLength?: number;

  @Input() minLength?: number;

  @Input() pattern?: string;

  @Input() class: string = '';

  @Output() inputChange = new EventEmitter<string>();

  @Output() inputFocus = new EventEmitter<FocusEvent>();

  @Output() inputBlur = new EventEmitter<FocusEvent>();

  @Output() clear = new EventEmitter<void>();

  internalValue: string = '';

  showPassword: boolean = false;

  // Icons
  readonly searchIcon = Search;

  readonly eyeIcon = Eye;

  readonly eyeOffIcon = EyeOff;

  readonly loaderIcon = Loader2;

  readonly alertIcon = AlertCircle;

  readonly checkIcon = CheckCircle2;

  readonly xIcon = X;

  private cdr = inject(ChangeDetectorRef);

  private onChange = (_value: string) => {};

  private onTouched = () => {};

  get currentValue(): string {
    return this.value || this.internalValue;
  }

  get inputType(): string {
    if (this.type === 'password' && this.showPasswordToggle) {
      return this.showPassword ? 'text' : 'password';
    }
    return this.type || 'text';
  }

  get containerClasses(): string {
    const baseClasses = 'relative flex items-center';
    const sizeClasses = {
      sm: 'text-sm',
      default: 'text-base',
      lg: 'text-lg',
    };
    return `${baseClasses} ${sizeClasses[this.size || 'default']} ${this.class}`;
  }

  get inputClasses(): string {
    const baseClasses = 'input w-full transition-all duration-200';

    const sizeClasses = {
      sm: 'h-8 px-3 text-sm',
      default: 'h-10 px-3',
      lg: 'h-12 px-4 text-lg',
    };

    const variantClasses = {
      default: '',
      error: 'input-error',
      success: 'input-success',
    };

    const paddingClasses = this.getPaddingClasses();

    return `${baseClasses} ${sizeClasses[this.size || 'default']} ${variantClasses[this.variant || 'default']} ${paddingClasses}`;
  }

  private getPaddingClasses(): string {
    let leftPadding = '';
    let rightPadding = '';

    if (this.leftIcon || this.type === 'search') {
      if (this.size === 'sm') {
        leftPadding = 'pl-8';
      } else if (this.size === 'lg') {
        leftPadding = 'pl-12';
      } else {
        leftPadding = 'pl-10';
      }
    }

    if (
      this.rightIcon ||
      this.loading ||
      this.clearable ||
      this.showPasswordToggle ||
      this.variant !== 'default'
    ) {
      if (this.size === 'sm') {
        rightPadding = 'pr-8';
      } else if (this.size === 'lg') {
        rightPadding = 'pr-12';
      } else {
        rightPadding = 'pr-10';
      }
    }

    return `${leftPadding} ${rightPadding}`;
  }

  get leftIconClasses(): string {
    const baseClasses =
      'absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none';
    const sizeClasses = {
      sm: 'left-2 w-4 h-4',
      default: 'left-3 w-4 h-4',
      lg: 'left-4 w-5 h-5',
    };
    return `${baseClasses} ${sizeClasses[this.size || 'default']}`;
  }

  get rightIconClasses(): string {
    const baseClasses = 'absolute right-0 top-1/2 -translate-y-1/2';
    const sizeClasses = {
      sm: 'right-2 w-4 h-4',
      default: 'right-3 w-4 h-4',
      lg: 'right-4 w-5 h-5',
    };
    return `${baseClasses} ${sizeClasses[this.size || 'default']}`;
  }

  get buttonClasses(): string {
    return `${this.rightIconClasses} text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-200`;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.internalValue = target.value;
    this.onChange(this.internalValue);
    this.inputChange.emit(this.internalValue);
    this.cdr.markForCheck();
  }

  onFocus(event: FocusEvent): void {
    this.inputFocus.emit(event);
  }

  onBlur(event: FocusEvent): void {
    this.onTouched();
    this.inputBlur.emit(event);
  }

  togglePasswordVisibility(): void {
    if (this.showPasswordToggle && !this.disabled && !this.readonly) {
      this.showPassword = !this.showPassword;
      this.cdr.markForCheck();
    }
  }

  clearInput(): void {
    if (this.clearable && !this.disabled && !this.readonly && this.currentValue) {
      this.internalValue = '';
      this.onChange(this.internalValue);
      this.inputChange.emit(this.internalValue);
      this.clear.emit();
      this.cdr.markForCheck();
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.internalValue = value || '';
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }
}
