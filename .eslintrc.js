module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    // 'eslint:recommended'
  ],
  rules: {
    'vue/no-parsing-error': [2, {
      'x-invalid-end-tag': false
    }],
    'vue/require-v-for-key': false,
    'vue/no-side-effects-in-computed-properties': 'off',
    'vue/no-async-in-computed-properties': false,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}