/**
 * Unified Input Component Styling Guide
 * 
 * This file provides standardized styling patterns for all input components
 * in the Looma project, ensuring visual consistency across the application.
 * 
 * Standard Color Scheme:
 * - Primary: Purple (primary-600)
 * - Error: Red (red-500)
 * - Disabled: Gray (gray-200 / gray-100)
 */

/**
 * Base Input Classes
 * Use these as the foundation for all input styling
 */
export const INPUT_STYLES = {
  /**
   * Default state - normal, uninteracted input
   * Apply these classes to all inputs as baseline
   */
  base: [
    'flex h-10 w-full min-w-0 rounded border px-3 py-1 text-base outline-none',
    'bg-white border-gray-300',
    'placeholder:text-gray-400',
    'transition-colors transition-shadow duration-200',
  ].join(' '),

  /**
   * Hover state - user hovers over input (not focused)
   * Subtle visual feedback to indicate interactivity
   */
  hover: [
    'hover:border-gray-400',
    'hover:bg-gray-50',
  ].join(' '),

  /**
   * Focus state - input is focused (active)
   * Clear visual indication of focus with primary color
   * Recommended primary color: primary-600
   */
  focus: [
    'focus:border-primary-500',
    'focus:ring-2 focus:ring-primary-100',
    'focus-visible:border-primary-500',
    'focus-visible:ring-2 focus-visible:ring-primary-100',
    'focus:outline-none',
  ].join(' '),

  /**
   * Disabled state - input is disabled/read-only
   * Visual indication that input cannot be interacted with
   */
  disabled: [
    'disabled:opacity-60',
    'disabled:bg-gray-100',
    'disabled:border-gray-200',
    'disabled:cursor-not-allowed',
  ].join(' '),

  /**
   * Error state - validation error
   * Red color scheme to indicate error
   * Apply in addition to base classes when error exists
   */
  error: [
    'border-red-500',
    'hover:border-red-600',
    'hover:bg-red-50',
    'focus:border-red-500',
    'focus:ring-2 focus:ring-red-100',
    'focus-visible:border-red-500',
    'focus-visible:ring-2 focus-visible:ring-red-100',
  ].join(' '),

  /**
   * Success state - validation success (optional)
   * Green color scheme to indicate success
   */
  success: [
    'border-green-500',
    'focus:border-green-500',
    'focus:ring-2 focus:ring-green-100',
    'focus-visible:border-green-500',
    'focus-visible:ring-2 focus-visible:ring-green-100',
  ].join(' '),

  /**
   * Dark mode adjustments (optional)
   */
  dark: [
    'dark:bg-slate-900',
    'dark:border-slate-700',
    'dark:text-white',
    'dark:placeholder:text-slate-400',
    'dark:hover:border-slate-600',
    'dark:focus:border-primary-400',
  ].join(' '),
};

/**
 * Combined Style Presets
 * Ready-to-use combinations for common scenarios
 */
export const INPUT_PRESETS = {
  /**
   * Standard input - default + hover + focus + disabled
   * Use this for most input fields
   */
  standard: [
    INPUT_STYLES.base,
    INPUT_STYLES.hover,
    INPUT_STYLES.focus,
    INPUT_STYLES.disabled,
  ].join(' '),

  /**
   * Error input - with error styling
   * Use this when displaying validation errors
   */
  errorState: [
    INPUT_STYLES.base,
    INPUT_STYLES.error,
    INPUT_STYLES.disabled,
  ].join(' '),

  /**
   * Success input - with success styling
   * Use this when displaying validation success
   */
  successState: [
    INPUT_STYLES.base,
    INPUT_STYLES.success,
    INPUT_STYLES.disabled,
  ].join(' '),

  /**
   * Compact input - smaller padding for inline usage
   */
  compact: [
    'flex h-8 w-full min-w-0 rounded border px-2 py-0.5 text-sm outline-none',
    'bg-white border-gray-300',
    'placeholder:text-gray-400',
    INPUT_STYLES.hover,
    INPUT_STYLES.focus,
    INPUT_STYLES.disabled,
  ].join(' '),

  /**
   * Large input - larger padding for prominent fields
   */
  large: [
    'flex h-12 w-full min-w-0 rounded border px-4 py-2 text-base outline-none',
    'bg-white border-gray-300',
    'placeholder:text-gray-400',
    INPUT_STYLES.hover,
    INPUT_STYLES.focus,
    INPUT_STYLES.disabled,
  ].join(' '),
};

/**
 * Implementation Guidelines
 * 
 * 1. Basic Input (no error):
 *    className={cn(INPUT_PRESETS.standard, customClasses)}
 * 
 * 2. Input with Error:
 *    className={cn(error ? INPUT_PRESETS.errorState : INPUT_PRESETS.standard)}
 * 
 * 3. Input with Success:
 *    className={cn(isValid ? INPUT_PRESETS.successState : INPUT_PRESETS.standard)}
 * 
 * 4. Custom Color Override (non-standard):
 *    If you need a different primary color (e.g., blue instead of purple):
 *    Replace focus classes with: focus:border-blue-500 focus:ring-blue-100
 * 
 * 5. Combining with Tailwind Classes:
 *    className={cn(
 *      INPUT_PRESETS.standard,
 *      'max-w-xs',  // custom size constraints
 *      'text-lg',   // custom text size
 *      'rounded-lg' // custom border radius
 *    )}
 * 
 * Key Principles:
 * - Always use INPUT_PRESETS.standard as the base
 * - Use error/success states conditionally
 * - Never hardcode individual hover/focus classes
 * - Keep primary color consistent (primary-600)
 * - Maintain ring-[color]/100 for focus states
 * - Use cn() utility for combining classes
 */

/**
 * Color Palette Reference
 * 
 * Primary (Focus): primary-500, primary-600, primary-100 (ring)
 * Error: red-500, red-600, red-100 (ring)
 * Success: green-500, green-600, green-100 (ring)
 * Neutral (Border): gray-300, gray-400, gray-200
 * Disabled: gray-100, gray-200, opacity-60
 * 
 * Standard Ring Width: 2px (ring-2)
 * Border Width: 1px (default)
 * Transition: duration-200
 */
