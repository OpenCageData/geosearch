module.exports = {
  env: {
    mocha: true,
    browser: true,
    es6: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['security'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    camelcase: 'off', // my_var is fine, no need for myVar
    'no-multiple-empty-lines': 'off',
    'no-console': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  },
  overrides: [
    {
      files: ['*.test.js', '*.spec.js', '*_test.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'no-unused-expressions': 'off',
      },
    },
  ],
};
