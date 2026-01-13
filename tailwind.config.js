/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // 使用 CSS 变量定义所有颜色，支持 oklch 色彩空间
        primary: 'oklch(var(--color-primary) / <alpha-value>)',
        red: 'oklch(var(--color-red) / <alpha-value>)',
        orange: 'oklch(var(--color-orange) / <alpha-value>)',
        yellow: 'oklch(var(--color-yellow) / <alpha-value>)',
        green: 'oklch(var(--color-green) / <alpha-value>)',
        blue: 'oklch(var(--color-blue) / <alpha-value>)',
        indigo: 'oklch(var(--color-indigo) / <alpha-value>)',
        purple: 'oklch(var(--color-purple) / <alpha-value>)',
        pink: 'oklch(var(--color-pink) / <alpha-value>)',
        gray: 'oklch(var(--color-gray) / <alpha-value>)',
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
