import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' 
export default defineConfig({
plugins: [react()],
  build: {
    outDir: './assets',
    emptyOutDir: true,
    assetsDir: '',  
    rollupOptions: {
      input: './index.html',
      output: {
        assetFileNames: '[name].[ext]',
        entryFileNames: '[name].js'
      }
    }
  },
  base: './' // This fixes path references
})