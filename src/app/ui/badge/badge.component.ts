import { Component, computed, input } from '@angular/core';
import { cn } from '@utils';

export interface BadgeProps {
  variant?: 'default' | 'success' | 'info' | 'warning' | 'destructive';
  size?: 'sm' | 'default' | 'lg';
  class?: string;
}

export type BadgeVariant = 'default' | 'success' | 'info' | 'warning' | 'destructive';
export type BadgeSize = 'sm' | 'default' | 'lg';

@Component({
  selector: 'app-badge',
  standalone: true,
  templateUrl: './badge.component.html',
  host: {
    '[class]': 'computedClasses()',
  },
})
export class BadgeComponent {
  variant = input<BadgeVariant>('default');

  size = input<BadgeSize>('default');

  class = input<string>('');

  computedClasses = computed(() =>
    cn('badge', this.getVariantClasses(), this.getSizeClasses(), this.class()),
  );

  private getVariantClasses(): string {
    switch (this.variant()) {
      case 'default':
        return 'badge-default';
      case 'success':
        return 'badge-success';
      case 'info':
        return 'badge-info';
      case 'warning':
        return 'badge-warning';
      case 'destructive':
        return 'badge-destructive';
      default:
        return 'badge-default';
    }
  }

  private getSizeClasses(): string {
    switch (this.size()) {
      case 'sm':
        return 'badge-sm';
      case 'lg':
        return 'badge-lg';
      case 'default':
      default:
        return '';
    }
  }
}
