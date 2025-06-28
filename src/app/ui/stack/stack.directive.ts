import { Directive, effect, ElementRef, inject, input } from '@angular/core';
import { cn } from '@utils';

export type StackDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type StackGap =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '8'
  | '10'
  | '12'
  | '16'
  | '20'
  | '24';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

@Directive({
  selector: '[appStack]',
  host: {
    '[class]': 'computedClasses()',
  },
})
export class StackDirective {
  private elementRef = inject(ElementRef<HTMLElement>);

  direction = input<StackDirection>('row');

  gap = input<StackGap>('4');

  align = input<StackAlign>('center');

  justify = input<StackJustify>('start');

  wrap = input<boolean>(false);

  constructor() {
    effect(() => {
      const classes = this.computedClasses();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const element: HTMLElement = this.elementRef.nativeElement;
      element.className = classes;
    });
  }

  computedClasses(): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const element: HTMLElement = this.elementRef.nativeElement;
    const existingClasses: string = element.getAttribute('class') || '';
    const customClasses: string = existingClasses
      .split(' ')
      .filter(
        (c: string) =>
          !c.includes('flex') &&
          !c.includes('gap-') &&
          !c.includes('items-') &&
          !c.includes('justify-') &&
          c !== '',
      )
      .join(' ');

    return cn(
      'flex',
      this.getDirectionClass(),
      this.getGapClass(),
      this.getAlignClass(),
      this.getJustifyClass(),
      this.wrap() && 'flex-wrap',
      customClasses,
    );
  }

  private getDirectionClass(): string {
    switch (this.direction()) {
      case 'row':
        return 'flex-row';
      case 'column':
        return 'flex-col';
      case 'row-reverse':
        return 'flex-row-reverse';
      case 'column-reverse':
        return 'flex-col-reverse';
      default:
        return 'flex-row';
    }
  }

  private getGapClass(): string {
    return `gap-${this.gap()}`;
  }

  private getAlignClass(): string {
    switch (this.align()) {
      case 'start':
        return 'items-start';
      case 'center':
        return 'items-center';
      case 'end':
        return 'items-end';
      case 'stretch':
        return 'items-stretch';
      case 'baseline':
        return 'items-baseline';
      default:
        return 'items-center';
    }
  }

  private getJustifyClass(): string {
    switch (this.justify()) {
      case 'start':
        return 'justify-start';
      case 'center':
        return 'justify-center';
      case 'end':
        return 'justify-end';
      case 'between':
        return 'justify-between';
      case 'around':
        return 'justify-around';
      case 'evenly':
        return 'justify-evenly';
      default:
        return 'justify-start';
    }
  }
}
