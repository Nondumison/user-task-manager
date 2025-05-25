
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
      '^.+\\.m?js$': 'babel-jest', 
    },
    transformIgnorePatterns: [
      'node_modules/(?!(axios)/)', 
    ],
  };
  