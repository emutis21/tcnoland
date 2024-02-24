import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'breakerbay': {
          '50': '#f1fcfb',
          '100': '#cef9f5',
          '200': '#9ef1eb',
          '300': '#65e3de',
          '400': '#36cbc9',
          '500': '#1a9e9f',
          '600': '#148a8d',
          '700': '#146e71',
          '800': '#15575a',
          '900': '#16494b',
          '950': '#06292d',
        },
      },
    },
  },
  plugins: [],
}
export default config
