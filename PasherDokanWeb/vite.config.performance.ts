import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Enhanced Vite configuration for optimal performance
export default defineConfig({
  plugins: [
    react()
  ],
  
  // Build optimizations
  build: {
    target: 'es2015',
    minify: 'terser',
    sourcemap: false,
    
    // Optimize bundle splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Core libraries
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['framer-motion'],
          'ui-vendor': ['lucide-react'],
          'map-vendor': ['leaflet'],
          // Feature-based chunks
          'accessibility': ['./src/contexts/AccessibilityContext.tsx', './src/hooks/useA11y.ts'],
          'performance': ['./src/hooks/usePerformanceMonitoring.ts'],
          'pwa': ['./src/hooks/usePWA.ts', './src/components/PWAInstallPrompt.tsx']
        },
        
        // Optimize chunk file names
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    },
    
    // Terser configuration for better minification
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'lucide-react'
    ],
    exclude: ['@vite/client', '@vite/env']
  },
  
  // Server configuration for development
  server: {
    port: 3000,
    host: true,
    open: true,
    cors: true
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    host: true,
    cors: true,
    headers: {
      'Cache-Control': 'max-age=31536000',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    }
  },
  
  // CSS optimization
  css: {
    modules: {
      localsConvention: 'camelCase'
    },
    postcss: './postcss.config.js',
    devSourcemap: false
  },
  
  // Asset handling
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.eot'],
  
  // Path aliases for cleaner imports
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@contexts': '/src/contexts',
      '@hooks': '/src/hooks',
      '@utils': '/src/utils',
      '@styles': '/src/styles',
      '@types': '/src/types'
    }
  },
  
  // Worker configuration
  worker: {
    format: 'es'
  }
});