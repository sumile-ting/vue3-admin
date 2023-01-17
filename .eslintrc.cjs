/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier',
    'plugin:prettier/recommended',
    'plugin:prettier-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        parser: 'flow',
        semi: false,
        tabWidth: 2,
        jsxSingleQuote: true,
        endOfLine: 'auto',
        useTabs: false,
        eslintIntegration: true,
        trailingComma: 'none',
        bracketSpacing: true
      }
    ]
  }
}
