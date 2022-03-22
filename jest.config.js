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
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
