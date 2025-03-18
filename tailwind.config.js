/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)', // 主色
        hover: 'var(--hover-color)',// hover的颜色
        gary: 'var(--text-gary)', // 文字灰色
        black: 'var(--text-black)',
        danger: 'var(--text-danger)',
      }
    }
  },
  plugins: [],
  // v3 版本的 tailwindcss 有些不同
  corePlugins: {
    preflight: false
  },
  important: true
};
