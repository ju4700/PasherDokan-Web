import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core libraries
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['lucide-react', 'framer-motion'],
          // Feature chunks for better caching
          'accessibility': ['./src/contexts/AccessibilityContext.tsx', './src/hooks/useA11y.ts'],
          'performance': ['./src/hooks/usePerformanceMonitoring.ts'],
          'pwa': ['./src/hooks/usePWA.ts', './src/components/PWAInstallPrompt.tsx']
        }
      }
    },
    chunkSizeWarningLimit: 600, // Slightly higher limit for better organization
    target: 'es2015'
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
    exclude: ['lucide-react'],
  },
});
