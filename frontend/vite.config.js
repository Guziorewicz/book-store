import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    // host: true,
    // port: 5555,
    proxy: {
      '/books-api': {
        target: 'http://fastapi-books:8000', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/books-api/, ''),
      },
      '/cart-api': {
        target: 'http://fastapi-cart:8000', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cart-api/, ''), 
      },
  }}
})
