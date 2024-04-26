const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  extends: ['@chaos-design/eslint-config-ts'],
  rules: {
    '@typescript-eslint/ban-types': 'off',
  },
});
