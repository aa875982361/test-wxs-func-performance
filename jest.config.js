/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  bail: 1,
    verbose: true,
    testEnvironment: 'jsdom',
    testURL: 'https://jest.test',
    moduleFileExtensions: ['js', 'ts'],
    testMatch: ['<rootDir>/src/**/__test__/**/*.spec.{js,ts}'],
    snapshotSerializers: ['miniprogram-simulate/jest-snapshot-plugin']
};
