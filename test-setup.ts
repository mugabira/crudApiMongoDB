export default async function globalSetup() {
  // This function runs once before all test files
  console.log('Running global setup for Vitest...');

  // Example: Set a global variable (accessible in tests if globals: true)
  globalThis.__TEST_GLOBAL__ = true;
}
