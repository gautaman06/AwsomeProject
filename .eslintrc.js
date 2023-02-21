module.exports = {
  env: {
    es6: true,
    node: true,
		jest: true,
	browser: true,
		es2021: true,
	
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
       "jsx": true
    } 
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    // quotes: ['error', 'single', { avoidEscape: true }],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'react/display-name': 'off',
    'react/jsx-indent': 'off',
    'react/prop-types': 'off',
        "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "import/extensions": [0],
    "camelcase": "off",
    'import/no-cycle': 'off',
    'react/no-unescaped-entities':'off',
    '@typescript-eslint/no-unused-vars': 'error',
    "no-param-reassign": 0,
    "@typescript-eslint/no-floating-promises": 'off',
    "@typescript-eslint/no-namespace": 'off',
    '@typescript-eslint/no-empty-interface':'off'
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
