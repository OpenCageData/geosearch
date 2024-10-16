import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json' with { type: 'json' };

const source = 'src/index.js';
// indicate which modules should be treated as external
const external = [
  '@algolia/autocomplete-js',
  '@algolia/autocomplete-theme-classic',
];

export default [
  // browser-friendly UMD build
  {
    input: source,
    external,
    output: {
      name: 'opencage',
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
