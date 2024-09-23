import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            h1: { color: 'rgba(var(--text-color))' },
            h2: { color: 'rgba(var(--text-color))' },
            h3: { color: 'rgba(var(--text-color))' },
            h4: { color: 'rgba(var(--text-color))' },
            h5: { color: 'rgba(var(--text-color))' },
            h6: { color: 'rgba(var(--text-color))' },
            p: {
              color: 'rgba(var(--text-color))',
            },
            a: {
              color: 'rgba(var(--color-info))',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            strong: {
              color: 'rgba(var(--text-text-color))',
            },
            // blockquote: {
            //   borderLeftColor: '#ccc',
            //   color: '#666',
            // },
            // code: {
            //   backgroundColor: '#f4f4f4',
            //   color: '#c7254e',
            //   padding: '2px 4px',
            //   borderRadius: '4px',
            // },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              borderRadius: '0',
            },
            ul: {
              listStyleType: 'disc',
            },
            ol: {
              listStyleType: 'decimal',
            },
            'ul > li::before': {
              backgroundColor: 'rgba(var(--accent-color))',
            },
            'ol > li::before': {
              color: 'rgba(var(--accent-color))',
            },
          },
        },
      },
    },
    fontSize: {
      xs: '0.6rem',
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    colors: {
      'primary-color': 'rgba(var(--primary-color))',
      'secondary-color': 'rgba(var(--secondary-color))',
      'accent-color': 'rgba(var(--accent-color))',
      'border-color': 'rgba(var(--border-color))',
      'text-color': 'rgba(var(--text-color))',
      // Feedback color
      'color-success': 'rgba(var(--color-success))',
      'color-error': 'rgba(var(--color-error))',
      'color-info': 'rgba(var(--color-info))',
      'color-warning': 'rgba(var(--color-warning))',
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
