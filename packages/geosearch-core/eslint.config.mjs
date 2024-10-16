import security from 'eslint-plugin-security';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/node_modules/',
      '**/coverage/',
      '**/dist/',
      '**/build/',
      '**/examples/',
      '**/demo/',
      'rollup.config.mjs',
    ],
  },
  ...compat.extends('airbnb-base', 'plugin:prettier/recommended'),
  {
    plugins: {
      security,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.mocha,
        ...globals.node,
      },

      ecmaVersion: 2021,
      sourceType: 'module',
    },

    rules: {
      camelcase: 'off',
      'no-multiple-empty-lines': 'off',
      'no-console': 'off',

      'no-plusplus': [
        'error',
        {
          allowForLoopAfterthoughts: true,
        },
      ],
    },
  },
  {
    files: [
      '**/*.test.js',
      '**/*.spec.js',
      '**/*_test.js',
      '**/rollup.config.mjs',
      '**/eslint.config.mjs',
    ],

    rules: {
      'import/no-extraneous-dependencies': 'off',
      'no-underscore-dangle': 'off',
      'no-unused-expressions': 'off',
    },
  },
];
