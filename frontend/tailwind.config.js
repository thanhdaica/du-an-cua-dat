/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Khai báo font Inter để sử dụng trong Tailwind classes
        inter: ['Inter', 'sans-serif'],
      },
      // Thêm keyframes cho hiệu ứng animate-blob
      keyframes: {
        blob: {
          "0%, 100%": { transform: 'translate(0, 0) scale(1)' },
          "33%": { transform: 'translate(30px, -50px) scale(1.1)' },
          "66%": { transform: 'translate(-20px, 20px) scale(0.9)' },
        }
      },
      animation: {
        blob: 'blob 7s infinite',
      }
    },
  },
  plugins: [],
}