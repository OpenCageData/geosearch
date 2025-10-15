import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'opencage',
      formats: ['umd'],
      fileName: () => 'opencage-geosearch-bundle.js',
    },
    outDir: 'dist/js',
    sourcemap: true,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
});
