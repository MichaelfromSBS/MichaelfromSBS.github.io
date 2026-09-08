import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base allows deploying either to root (username.github.io)
  // or subfolder (username.github.io/repository-name) without 404s
  base: './',
})
