/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // 使用 CSS 变量定义所有颜色
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        red: 'rgb(var(--color-red) / <alpha-value>)',
        orange: 'rgb(var(--color-orange) / <alpha-value>)',
        yellow: 'rgb(var(--color-yellow) / <alpha-value>)',
        green: 'rgb(var(--color-green) / <alpha-value>)',
        blue: 'rgb(var(--color-blue) / <alpha-value>)',
        indigo: 'rgb(var(--color-indigo) / <alpha-value>)',
        purple: 'rgb(var(--color-purple) / <alpha-value>)',
        pink: 'rgb(var(--color-pink) / <alpha-value>)',
        gray: 'rgb(var(--color-gray) / <alpha-value>)',
        black: 'rgb(var(--color-black) / <alpha-value>)',
        white: 'rgb(var(--color-white) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
