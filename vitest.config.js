import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['packages/**/test/**/*.spec.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['packages/**/src/**/*.js'],
      exclude: [
        'node_modules/',
        'dist/',
        'examples/',
        '**/*.spec.js',
        '**/*.test.js',
      ],
    },
  },
});
