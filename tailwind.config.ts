import type { Config } from 'tailwindcss';

/**
 * Tailwind CSS v4 Configuration for lescom project
 * Based on Supabase theme design system
 */
const config: Config = {
  // Content paths for purging unused styles
  content: [
    './src/**/*.{html,ts,tsx,js,jsx}',
    './src/**/*.component.html',
    './src/**/*.component.ts',
  ],

  // Theme configuration is handled in theme.css file
  // This config file is primarily for content paths and plugins

  // Plugins
  plugins: [
    // Add plugins as needed
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
};

export default config;
