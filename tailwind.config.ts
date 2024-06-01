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
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, rgb(var(--tw-gradient-stops))',
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
  plugins: [],
};
export default config;
