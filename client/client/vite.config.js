import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
 // base: '/Hermanos-Jota/',
  base: '/',
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // apunta al backend
        changeOrigin: true,
        secure: false
      }
    }
  }
})
