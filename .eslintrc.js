module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    indent: /*['error', 2],*/ 'off', //expected indentation of 2 spaces but found 4. eslint(indent) 라는 오류가 발생해서 꺼두었습니다.
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/no-unescaped-entities': 0,
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/prop-types': ['error', { ignore: ['navigation', 'route'] }],
  },
};
