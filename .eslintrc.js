module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['oss-ui', 'plugin:jest/recommended'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: ['oss-ui', 'oss-ui-typescript', 'prettier'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        'react/prop-types': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-filename-extension': 'off',
        'import/no-unresolved': 'off',
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksVoidReturn: false,
          },
        ],
      },
    },
  ],
  parserOptions: { ecmaVersion: 2018, sourceType: 'module' },
  plugins: ['babel', 'react', 'react-hooks'],
  settings: { react: { version: 'detect' } },
};
