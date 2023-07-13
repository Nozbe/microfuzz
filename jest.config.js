module.exports = {
  verbose: true,
  bail: true,
  rootDir: __dirname,
  modulePaths: ['<rootDir>/src'],
  moduleDirectories: ['<rootDir>/node_modules'],
  restoreMocks: true,
  moduleFileExtensions: ['js'],
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/dev'],
  cacheDirectory: '.cache/jest',
}
