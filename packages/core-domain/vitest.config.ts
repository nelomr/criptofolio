import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: '@criptofolio/core-domain',
    passWithNoTests: true,
    environment: 'node',
  },
});
