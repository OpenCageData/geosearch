/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
