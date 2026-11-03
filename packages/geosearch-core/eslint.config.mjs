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
  ...compat.extends('eslint:recommended', 'plugin:prettier/recommended'),
  security.configs.recommended,
  {
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
      // kept from airbnb-base
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-var': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      'no-shadow': 'error',
      'no-throw-literal': 'error',
      'no-param-reassign': ['error', { props: true }],
      'consistent-return': 'error',
      radix: 'error',
      'no-promise-executor-return': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',

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
      'no-underscore-dangle': 'off',
      'no-unused-expressions': 'off',
    },
  },
];
