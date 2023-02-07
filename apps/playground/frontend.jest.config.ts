import nextJest from 'next/jest';
import { Config } from 'jest';
import { commonJestConfig } from './common.jest.config';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig: Config = {
  ...commonJestConfig,
  globalSetup: '<rootDir>/test-configuration/frontend/globalSetup.ts',
  globalTeardown: '<rootDir>/test-configuration/frontend/globalTeardown.ts',
  setupFilesAfterEnv: ['<rootDir>/test-configuration/frontend/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/?(*.)frontend.+(spec|test).[jt]s?(x)'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);
