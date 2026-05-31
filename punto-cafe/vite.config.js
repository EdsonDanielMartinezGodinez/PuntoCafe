import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/PuntoCafe/', // required for GitHub Pages project site
  plugins: [react()],
})
