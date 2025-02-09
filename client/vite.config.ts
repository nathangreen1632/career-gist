import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
    open: true,
    proxy: {
      '/api/jsearch/query': {
        target: 'http://localhost:3001/api/jsearch/query',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'http://localhost:3001/api/jsearch/query',
        changeOrigin: true,
        secure: false
      },
    },
  },
});