import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from 'rollup-plugin-replace';

import pkg from './package.json' with { type: 'json' };

const source = 'src/index.js';

export default [
  // browser-friendly UMD build
  {
    input: source,
    output: {
      name: 'opencage',
      file: pkg.main,
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      resolve(),
      commonjs({
        exclude: 'src/**',
        include: 'node_modules/**',
      }),
    ],
  },
];
