import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts:[
      'localhost',
      'student-1-5usy.onrender.com',
      '127.0.0.1'
    ]
  },
})
