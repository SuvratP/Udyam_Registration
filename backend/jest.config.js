export default {
  testEnvironment: 'node',
  transform: {}, // no transform needed if you're not using Babel or TS
  // Remove 'extensionsToTreatAsEsm' here
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // For Jest to resolve .js imports correctly
  },
};
