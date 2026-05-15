import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { compression } from 'vite-plugin-compression2'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [
    vue(),
    vueDevTools(),
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: false })]
    }),
    compression({ algorithms: ['gzip'], threshold: 1024 }),
    compression({ algorithms: ['brotliCompress'], threshold: 1024, filename: '[path][base].br' }),
    viteImagemin({
      gifsicle: { optimizationLevel: 7, interlaced: false },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9], speed: 4 },
      svgo: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'removeEmptyAttrs', active: false },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('ant-design-vue') || id.includes('@ant-design')) return 'antd'
            if (id.includes('vue-draggable-plus')) return 'draggable'
            if (id.includes('vue') || id.includes('pinia') || id.includes('vue-router')) return 'vue-vendor'
          }
        }
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: false,
    open: true,
  },
})
