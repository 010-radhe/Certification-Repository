import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    open: true,
    strictPort: true,
    allowedHosts: ['cameron-carpellary-pseudoaesthetically.ngrok-free.dev'] // add ngrok host here
  }
})
