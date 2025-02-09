import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000, // The port your Vite frontend is running on
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Your backend server base URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
//Key Points:
  //This configuration sets up a proxy for your Vite frontend to communicate with your backend server
  //When your frontend makes a request to /api, it will be forwarded to your backend server at http://localhost:3001
  //This allows you to avoid CORS issues during development
  //Make sure to adjust the target URL to match your backend server's address
  //You can also set up additional proxies for different API endpoints
  //This configuration is defined in client/vite.config.ts
  //It's used by Vite to set up the development server
  //You can customize the server port, open the browser automatically, and configure other options
  //For more details, refer to the Vite documentation on server configuration