import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^axios$': '<rootDir>/node_modules/axios/dist/node/axios.cjs.js',
 // use CJS version
  },
  transform: {
    '^.+\\.(ts|tsx)?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        isolatedModules: true,
      },
    ],
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(axios|@babel/runtime)/)'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [151001],
      },
    },
  },
};

export default config;
