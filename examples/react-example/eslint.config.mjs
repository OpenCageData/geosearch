import eslintReact from '@eslint-react/eslint-plugin';
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
    ignores: ['**/node_modules/', '**/build/', '**/dist/'],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended' // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ),
  eslintReact.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs}'], // ESLint only lints *.js, *.mjs and *.cjs by default

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },

      ecmaVersion: 2021, // Allows for the parsing of modern ECMAScript features
      sourceType: 'module', // Allows for the use of imports

      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Allows for the parsing of JSX
        },
      },
    },

    settings: {
      jest: {
        version: 'detect',
      },
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
    files: ['**/eslint.config.mjs'],

    rules: {
      'no-underscore-dangle': 'off',
    },
  },
];
