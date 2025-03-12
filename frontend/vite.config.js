console.log("Vite config is being loaded!");

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({

  plugins: [
    react(),tailwindcss()],
    server: {
      host: '127.0.0.1',
      proxy: {
        '/api': {
          target: 'http://localhost:8000/',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => {
            const newPath = path.replace(/^\/api/, '');
            console.log(`Rewriting path ${path} to ${newPath}`);
            return newPath;
          }
        }
      }
    }
 
})
