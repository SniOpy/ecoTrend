import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Important pour certains environnements Docker ou WSL
    },
    port: 5173,
    open: true, // Ouvre automatiquement le navigateur
  },
});
