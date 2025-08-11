// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
   
    allowedHosts: ['547693694d4e.ngrok-free.app'],
    hmr: { clientPort: 443 } // HMR qua https
  }
})

