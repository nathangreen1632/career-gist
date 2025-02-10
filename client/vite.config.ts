import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{
      find: '@/shared', replacement: path.resolve(import.meta.dirname, '../shared'),
    }],
  },
    server: {
      port: 3000,
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