import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: 'dist',
      insertTypesEntry: true,
    }),
  ],
  build: {
    cssCodeSplit: true,
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'yozora-vue',
      fileName: (format) => `yozora-vue.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named', // Add this line to resolve the warning
      },
    },
  },
})
