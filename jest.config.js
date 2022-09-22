// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  collectoverage: true,
  testResultsProcessor: 'jest-sonar-reporter',
  collectCoverageFrom: [
    '<rootDir>/src',
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/sonarqube-7.1/**',
    '!**/coverage/**',
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@components': '<rootDir>/src/components',
    '^@types': '<rootDir>/src/types',
    '^@enums': '<rootDir>/src/enums',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
