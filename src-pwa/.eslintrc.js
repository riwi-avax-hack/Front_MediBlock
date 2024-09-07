const { resolve } = require('path');

module.exports = {
  parserOptions: {
    project: resolve(__dirname, './tsconfig.eslint.json'), // Update this line
  },

  overrides: [
    {
      files: ['custom-service-worker.ts'],

      env: {
        serviceworker: true,
      },
    },
  ],
};