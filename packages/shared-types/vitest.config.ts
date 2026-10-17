import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: '@criptofolio/shared-types',
    passWithNoTests: true,
    environment: 'node',
  },
});
