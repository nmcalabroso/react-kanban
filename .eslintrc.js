module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    }
  },
  plugins: [
    'import',
    'react'
  ],
  rules: {
    'react/jsx-uses-vars': 2,
    'react/react-in-jsx-scope': 2,
    'react/no-deprecated': 2,
    'import/named': 2,
    'import/namespace': 2,
    'import/export': 2,
    'import/default': 2,
    'import/no-commonjs': 2,
    'import/no-amd': 2,
    'import/imports-first': 2,
    'import/no-duplicates': 2
  }
};
