// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/ol-opencage-geosearch.js'),
      formats: ['es', 'cjs'],
      fileName: (format) => {
        if (format === 'es') return 'ol-opencage-geosearch.esm.js';
        return 'ol-opencage-geosearch.cjs.js';
      },
    },
    outDir: 'dist',
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      external: [
        'ol/control/Control',
        '@algolia/autocomplete-js',
        '@opencage/geosearch-core',
      ],
    },
  },
});
