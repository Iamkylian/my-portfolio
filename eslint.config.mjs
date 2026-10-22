import tseslint from 'typescript-eslint'
import vue from 'eslint-plugin-vue'

export default tseslint.config(
  {
    ignores: [
      '.nuxt/**',
      '.output/**',
      'node_modules/**',
      'test-results/**',
      'playwright-report/**',
    ],
  },
  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      // Formatting is checked by Prettier, separately from semantic lint rules.
      'vue/html-indent': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/html-self-closing': [
        'error',
        { html: { void: 'always', normal: 'never', component: 'always' } },
      ],
    },
  },
)
