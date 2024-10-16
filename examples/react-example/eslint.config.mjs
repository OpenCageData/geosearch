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
    ignores: ['**/node_modules/', '**/build/'],
  },
  ...compat.extends(
    'airbnb-base',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:jest/recommended',
    'plugin:prettier/recommended' // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ),
  {
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
      react: {
        version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
      },
      jest: {
        version: 'detect',
      },

      'import/resolver': {
        node: {
          paths: ['src'],
        },
      },
    },

    rules: {
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
      'import/no-extraneous-dependencies': 'off',
      'no-underscore-dangle': 'off',
    },
  },
];
