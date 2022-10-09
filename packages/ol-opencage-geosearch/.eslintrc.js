module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2021,
  },
  // temp rules
  rules: {
    'func-names': 0,
    'no-unused-vars': 'off',
  },
  overrides: [
    {
      files: ['rollup.config.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
