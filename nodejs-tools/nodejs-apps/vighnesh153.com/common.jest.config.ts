import { Config } from 'jest';

export const commonJestConfig: Config = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
  roots: ['<rootDir>/src/'],
};
