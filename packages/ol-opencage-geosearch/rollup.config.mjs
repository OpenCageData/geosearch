import pkg from './package.json' with { type: 'json' };

const source = 'src/ol-opencage-geosearch.js';

const external = [
  'ol/control/Control',
  '@algolia/autocomplete-js',
  '@opencage/geosearch-core',
];

export default [
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
