module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native' +
      '|@react-native' +
      '|expo(nent)?' +
      '|@expo(nent)?' +
      '|firebase' +
      '|@firebase' +
      '|react-native-vector-icons' +
      '|@react-navigation' +
      ')',
  ],
  moduleNameMapper: {
    '^react-native-chart-kit$': '<rootDir>/src/__mocks__/react-native-chart-kit.tsx',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
};
