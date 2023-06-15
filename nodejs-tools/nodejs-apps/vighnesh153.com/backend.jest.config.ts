import nextJest from 'next/jest';
import { Config } from 'jest';
import { commonJestConfig } from './common.jest.config';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig: Config = {
  ...commonJestConfig,
  globalSetup: '<rootDir>/test-configuration/backend/globalSetup.ts',
  globalTeardown: '<rootDir>/test-configuration/backend/globalTeardown.ts',
  setupFilesAfterEnv: ['<rootDir>/test-configuration/backend/jest.setup.ts'],
  testEnvironment: 'node',
  testMatch: ['**/?(*.)backend.+(spec|test).[jt]s?(x)'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);
