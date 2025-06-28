import { compact, isArray, isString } from 'lodash-es';

/**
 * Type for class name input - can be string, array of strings/values, or conditional classes
 */
export type ClassNameInput =
  | string
  | (string | ClassNameInput)[]
  | Record<string, boolean>
  | undefined
  | null
  | false;

/**
 * Utility function to combine and clean class names using lodash-es
 * Handles strings, arrays, conditional objects, and filters out falsy values
 *
 * @param classes - Variable number of class name inputs
 * @returns A clean, space-separated string of class names
 *
 * @example
 * ```typescript
 * // Basic usage
 * cn('badge', 'badge-primary') // 'badge badge-primary'
 *
 * // With arrays
 * cn(['badge', 'rounded'], 'text-sm') // 'badge rounded text-sm'
 *
 * // With conditional objects
 * cn('badge', { 'badge-primary': true, 'disabled': false }) // 'badge badge-primary'
 *
 * // With falsy values (filtered out)
 * cn('badge', null, undefined, '', 'primary') // 'badge primary'
 *
 * // Complex example
 * cn(
 *   'badge',
 *   variant === 'primary' && 'badge-primary',
 *   { 'badge-sm': size === 'sm' },
 *   customClass
 * )
 * ```
 */
export function cn(...classes: ClassNameInput[]): string {
  const processedClasses: string[] = [];

  for (const cls of classes) {
    if (!cls) {
      // Skip falsy values
    } else if (isString(cls)) {
      // Handle string - trim and split by spaces to handle multi-class strings
      const trimmed = cls.trim();
      if (trimmed) {
        processedClasses.push(...trimmed.split(/\s+/));
      }
    } else if (isArray(cls)) {
      // Handle array - recursively process each item
      const arrayResult = cn(...(cls as ClassNameInput[]));
      if (arrayResult) {
        processedClasses.push(...arrayResult.split(/\s+/));
      }
    } else if (typeof cls === 'object' && cls !== null) {
      // Handle conditional object - add keys where value is truthy
      for (const [key, value] of Object.entries(cls)) {
        if (value && isString(key)) {
          const trimmed = key.trim();
          if (trimmed) {
            processedClasses.push(...trimmed.split(/\s+/));
          }
        }
      }
    }
  }

  // Use lodash compact to remove empty strings and deduplicate
  const uniqueClasses = Array.from(new Set(compact(processedClasses)));

  return uniqueClasses.join(' ');
}

/**
 * Alias for cn function - shorter name for frequent usage
 */
export const clsx = cn;
