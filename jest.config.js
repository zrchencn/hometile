export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  },
  collectCoverageFrom: ['public/src/**/*.{js,jsx}']
};
