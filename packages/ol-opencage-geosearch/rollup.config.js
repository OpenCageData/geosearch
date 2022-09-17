import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

const source = 'ol-opencage-geosearch.js';

const globals = {
  'ol/control/Control': 'ol.control.Control',
  '@algolia/autocomplete-js': 'autocomplete',
  '@opencage/geosearch-core': 'OpenCageGeoSearchPlugin',
};
const external = [
  'ol/control/Control',
  '@algolia/autocomplete-js',
  '@opencage/geosearch-core',
];

export default [
  // browser-friendly UMD build
  {
    input: source,
    external,
    output: {
      globals,
      name: 'OpenCageGeosearchControl',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs({
        exclude: 'src/**',
        include: 'node_modules/**',
      }),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: source,
    external,
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
];
