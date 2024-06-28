import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(rgb(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, rgb(var(--tw-gradient-stops))',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            h1: { color: 'rgba(var(--gray))' },
            h2: { color: 'rgba(var(--gray))' },
            h3: { color: 'rgba(var(--gray))' },
            h4: { color: 'rgba(var(--gray))' },
            h5: { color: 'rgba(var(--gray))' },
            h6: { color: 'rgba(var(--gray))' },
            p: {
              color: 'rgba(var(--gray))',
            },
            a: {
              color: '#3498db',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            strong: {
              color: '#000',
            },
            blockquote: {
              borderLeftColor: '#ccc',
              color: '#666',
            },
            code: {
              backgroundColor: '#f4f4f4',
              color: '#c7254e',
              padding: '2px 4px',
              borderRadius: '4px',
            },
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
              backgroundColor: '#3498db',
            },
            'ol > li::before': {
              color: '#3498db',
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
      white: 'rgba(var(--white))',
      black: 'rgba(var(--black))',
      border: 'rgba(var(--border))',
      red: 'rgba(var(--red))',
      gray: 'rgba(var(--gray))',
      'light-gray': 'rgba(var(--light-gray))',
      'dark-gray': 'rgba(var(--dark-gray))',
      'dark-gray-accent': 'rgb(var(--dark-gray-accent))',
      purple: 'rgba(var(--purple))',
      emerald: 'rgba(var(--emerald))',
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
