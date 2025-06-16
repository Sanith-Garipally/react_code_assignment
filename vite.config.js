import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: './setupTests.js',
    environment: 'jsdom',
    globals: true,
    include: ['**/*.test.{js,jsx,ts,tsx}'], 
  },
})
