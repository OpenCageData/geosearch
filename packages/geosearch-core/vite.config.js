// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'opencage',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'opencage-geosearch-core.esm.js';
        if (format === 'cjs') return 'opencage-geosearch-core.cjs.js';
        return 'opencage-geosearch-core.js';
      },
    },
    outDir: 'dist/js',
    sourcemap: true,
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      external: [
        '@algolia/autocomplete-js',
        '@algolia/autocomplete-theme-classic',
      ],
      output: {
        exports: 'named',
        globals: {
          '@algolia/autocomplete-js': 'autocomplete',
          '@algolia/autocomplete-theme-classic': 'autocompleteThemeClassic',
        },
      },
    },
  },
});
