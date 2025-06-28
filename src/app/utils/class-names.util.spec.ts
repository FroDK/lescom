import { clsx, cn } from './class-names.util';

describe('ClassNames Utility', () => {
  describe('cn function', () => {
    describe('Basic functionality', () => {
      it('should handle empty inputs', () => {
        expect(cn()).toBe('');
        expect(cn('')).toBe('');
        expect(cn(null)).toBe('');
        expect(cn(undefined)).toBe('');
        expect(cn(false)).toBe('');
      });

      it('should handle single string inputs', () => {
        expect(cn('class1')).toBe('class1');
        expect(cn('class1 class2')).toBe('class1 class2');
        expect(cn(' class1 class2 ')).toBe('class1 class2');
      });

      it('should handle multiple string inputs', () => {
        expect(cn('class1', 'class2')).toBe('class1 class2');
        expect(cn('class1', 'class2', 'class3')).toBe('class1 class2 class3');
      });

      it('should filter out falsy values', () => {
        expect(cn('class1', null, 'class2', undefined, 'class3', false, '')).toBe(
          'class1 class2 class3',
        );
      });
    });

    describe('Array inputs', () => {
      it('should handle array inputs', () => {
        expect(cn(['class1', 'class2'])).toBe('class1 class2');
        expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3');
      });

      it('should handle nested arrays', () => {
        expect(cn(['class1', ['class2', 'class3']])).toBe('class1 class2 class3');
      });

      it('should filter falsy values in arrays', () => {
        expect(cn(['class1', '', 'class2'])).toBe('class1 class2');
      });
    });

    describe('Object inputs', () => {
      it('should handle conditional objects', () => {
        expect(cn({ class1: true, class2: false, class3: true })).toBe('class1 class3');
      });

      it('should handle mixed inputs with objects', () => {
        expect(cn('base', { conditional1: true, conditional2: false }, 'final')).toBe(
          'base conditional1 final',
        );
      });

      it('should handle object keys with spaces', () => {
        expect(cn({ 'class1 class2': true, 'class3 class4': false })).toBe('class1 class2');
      });
    });

    describe('Deduplication', () => {
      it('should remove duplicate classes', () => {
        expect(cn('class1', 'class2', 'class1')).toBe('class1 class2');
        expect(cn('class1 class2', 'class2 class3')).toBe('class1 class2 class3');
      });

      it('should handle duplicates from different input types', () => {
        expect(cn('class1', ['class2'], { class1: true, class3: true })).toBe(
          'class1 class2 class3',
        );
      });
    });

    describe('Whitespace handling', () => {
      it('should trim whitespace from inputs', () => {
        expect(cn('  class1  ', '  class2  ')).toBe('class1 class2');
        expect(cn(' class1 class2 ', ' class3 ')).toBe('class1 class2 class3');
      });

      it('should handle multiple spaces in class strings', () => {
        expect(cn('class1    class2', 'class3   class4')).toBe('class1 class2 class3 class4');
      });
    });

    describe('Complex scenarios', () => {
      it('should handle complex mixed inputs', () => {
        const variant = 'primary';
        const size = 'lg';
        const isDisabled = false;
        const customClass = 'custom-style';

        const result = cn(
          'base-class',
          variant === 'primary' && 'variant-primary',
          { 'size-lg': size === 'lg' },
          { disabled: isDisabled },
          customClass,
        );

        expect(result).toBe('base-class variant-primary size-lg custom-style');
      });

      it('should handle real-world component class building', () => {
        const result = cn('badge', 'badge-success', 'badge-lg', '  custom-class  ');

        expect(result).toBe('badge badge-success badge-lg custom-class');
      });

      it('should handle conditional classes with falsy conditions', () => {
        const showBorder = false;
        const isActive = true;
        const theme = '';

        const result = cn(
          'component',
          showBorder && 'border',
          isActive && 'active',
          theme && `theme-${theme}`,
          'final-class',
        );

        expect(result).toBe('component active final-class');
      });
    });

    describe('Edge cases', () => {
      it('should handle empty strings and spaces', () => {
        expect(cn('', ' ', '  ', 'class1')).toBe('class1');
      });

      it('should handle large numbers of classes', () => {
        const classes = Array.from({ length: 100 }, (_, i) => `class${i}`);
        const result = cn(...classes);
        expect(result).toBe(classes.join(' '));
      });

      it('should handle special characters in class names', () => {
        expect(cn('class-1', 'class_2', 'class:3')).toBe('class-1 class_2 class:3');
      });
    });
  });

  describe('clsx alias', () => {
    it('should be an alias for cn function', () => {
      expect(clsx).toBe(cn);
    });

    it('should work identically to cn', () => {
      const input = ['class1', { class2: true, class3: false }, 'class4'];
      expect(clsx(...input)).toBe(cn(...input));
    });
  });

  describe('Type safety', () => {
    it('should handle different input types without errors', () => {
      // This test mainly checks that TypeScript compilation works
      // and that the function gracefully handles various inputs
      expect(() => {
        cn(
          'string',
          ['array', 'of', 'strings'],
          { object: true, with: false, conditionals: true },
          null,
          undefined,
          false,
          '',
        );
      }).not.toThrow();
    });
  });
});
