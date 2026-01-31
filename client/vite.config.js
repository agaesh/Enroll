import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host:true
  },
  optimizeDeps: {
    exclude: ["sequelize", "pg", "pg-hstore"]
  },
  build: {
    rollupOptions: {
      external: ["sequelize", "pg", "pg-hstore"]
    }
  }
})
