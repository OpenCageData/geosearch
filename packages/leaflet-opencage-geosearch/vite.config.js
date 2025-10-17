// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'LeafletOpenCageGeosearch',
      formats: ['es', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'leaflet-opencage-geosearch.esm.js';
        return 'leaflet-opencage-geosearch.js';
      },
    },
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      // Dependencies that shouldn't be bundled
      external: [
        'leaflet',
        '@algolia/autocomplete-js',
        '@opencage/geosearch-core',
      ],
      output: {
        exports: 'named',
        // Provide global variable names for UMD build
        globals: {
          leaflet: 'L',
          '@algolia/autocomplete-js': 'autocomplete',
          '@opencage/geosearch-core': 'opencage',
        },
        // For UMD build, attach to L.Control namespace for Leaflet 1.x compatibility
        extend: true,
      },
    },
  },
});
