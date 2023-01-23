import { Config } from 'jest';

export const commonJestConfig: Config = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
  },
  preset: 'ts-jest',
};
