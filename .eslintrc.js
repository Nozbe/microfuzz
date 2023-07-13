const config = {
  env: {
    es6: true,
    jest: true,
  },
  plugins: ['flowtype', '@typescript-eslint'],
  extends: [
    // https://github.com/airbnb/javascript
    'airbnb',
    'plugin:flowtype/recommended',
    'prettier',
    'plugin:jest/recommended',
  ],
  parser: '@babel/eslint-parser',
  ignorePatterns: 'examples/typescript/**/*.ts',
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
  },
  rules: {
    curly: ['error', 'all'],
    'class-methods-use-this': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'no-console': ['error'],
    'no-unused-expressions': 'off',
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-useless-escape': 'off',
    'func-names': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'no-else-return': [
      'error',
      {
        allowElseIf: true,
      },
    ],
    // formatting (off - formatting is Prettier's job)
    semi: ['error', 'never'],
    'arrow-parens': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'react/jsx-first-prop-new-line': 'off',
    'operator-linebreak': 'off',
    'object-curly-newline': 'off',
    'function-paren-newline': 'off',
    'max-classes-per-file': 'off',
    camelcase: 'off',
    'react/jsx-indent': 'off',
    quotes: 'off',
    'react/jsx-curly-newline': 'off',
    'lines-between-class-members': 'off',
    'one-var': 'off',
    'arrow-body-style': 'off',
    // react
    'react/prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-indent-props': ['error'],
    'react/prefer-stateless-function': [
      1,
      {
        ignorePureComponents: true,
      },
    ],
    'react/jsx-boolean-value': ['error', 'always'],
    'react/no-unused-prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'import/prefer-default-export': 'off',
    'import/named': 'off', // doesn't seem to work with Flow
    'import/no-extraneous-dependencies': 'off',
    'import/no-cycle': 'error',
    'jest/no-large-snapshots': 'warn',
    'jest/no-disabled-tests': 'off',
    'jest/expect-expect': 'off',
    'global-require': 'off',
    'no-plusplus': 'off',
    'prefer-object-spread': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-no-bind': 'off',
    'flowtype/space-after-type-colon': 'off',
    'flowtype/generic-spacing': 'off',
    'flowtype/delimiter-dangle': ['error', 'always-multiline'],
    'flowtype/require-return-type': [
      'error',
      'always',
      {
        excludeArrowFunctions: true,
        annotateUndefined: 'always',
      },
    ],
  },
  overrides: [
    {
      files: ['src/**/*.js'],
      excludedFiles: ['*integrationTest.js', '*test.js', '**/__tests__/**', '*test.*.js'],
      rules: {
        'flowtype/require-valid-file-annotation': ['error', 'always'],
      },
    },
    {
      files: ['src/**/*.ts', 'examples/typescript/*.ts'],
      parser: '@typescript-eslint/parser',
      rules: {
        'flowtype/no-types-missing-file-annotation': 'off',
        'no-unused-vars': 'off',
      },
    },
  ],
  globals: {
    document: true,
    window: true,
    self: true,
    globalThis: true,
  },
}

module.exports = config
