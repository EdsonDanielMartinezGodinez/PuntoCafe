import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],
  // GitHub Pages sirve el sitio en /PuntoCafe/ (build y preview); en desarrollo se queda en la raíz
  base: command === 'build' || isPreview ? '/PuntoCafe/' : '/',
  server: {
    host: true, // expone el servidor en la red local para probar desde el celular
  },
}))
