import { Directive, effect, ElementRef, HostListener, inject, input, output } from '@angular/core';
import { cn } from '@utils';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive';
export type ButtonSize = 'sm' | 'default' | 'lg';

@Directive({
  selector: 'button[appButton]',
  host: {
    '[class]': 'computedClasses()',
    '[disabled]': 'disabled()',
    '[type]': 'type()',
  },
})
export class ButtonDirective {
  private elementRef = inject(ElementRef<HTMLButtonElement>);

  variant = input<ButtonVariant>('primary');

  size = input<ButtonSize>('default');

  disabled = input<boolean>(false);

  type = input<'button' | 'submit' | 'reset'>('button');

  pressed = output<Event>();

  constructor() {
    effect(() => {
      const classes = this.computedClasses();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const element: HTMLButtonElement = this.elementRef.nativeElement;
      element.className = classes;
    });
  }

  @HostListener('click', ['$event'])
  handleClick(event: Event): void {
    if (!this.disabled()) {
      this.pressed.emit(event);
    }
  }

  computedClasses(): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const element: HTMLButtonElement = this.elementRef.nativeElement;
    const existingClasses: string = element.getAttribute('class') || '';
    const customClasses: string = existingClasses
      .split(' ')
      .filter((c: string) => !c.startsWith('btn-') && c !== 'btn' && c !== '')
      .join(' ');

    return cn(this.getVariantClasses(), this.getSizeClasses(), customClasses);
  }

  private getVariantClasses(): string {
    switch (this.variant()) {
      case 'primary':
        return 'btn-primary';
      case 'secondary':
        return 'btn-secondary';
      case 'destructive':
        return 'btn-destructive';
      default:
        return 'btn-primary';
    }
  }

  private getSizeClasses(): string {
    switch (this.size()) {
      case 'sm':
        return 'btn-sm';
      case 'lg':
        return 'btn-lg';
      case 'default':
      default:
        return '';
    }
  }
}
