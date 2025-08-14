import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,            // Allows using describe, it, expect without imports
    environment: 'node',      // Node.js environment (good for backend testing)
    include: ['tests/**/*.test.js'], // Test file pattern
    coverage: {
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
    },
  },
});