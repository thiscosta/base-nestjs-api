/* eslint-disable @typescript-eslint/no-var-requires */
const { compilerOptions } = require('./tsconfig');

module.exports = {
  moduleNameMapper: {
    'test/(.*)': '<rootDir>/test/$1',
    'src/(.*)': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: compilerOptions.baseUrl,
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/*.(t|j)s',
    'src/**/*.(t|j)s',
    '!src/*.module.(t|j)s',
    '!src/**/*.module.(t|j)s',
    '!src/main.ts',
    '!src/config/**',
    '!src/prisma/**',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
