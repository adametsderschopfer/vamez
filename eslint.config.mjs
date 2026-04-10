import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from 'eslint-config-prettier'

export default withNuxt(
  {
    ignores: ['.nuxt/**', '.output/**', 'node_modules/**']
  },
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }]
    }
  },
  eslintConfigPrettier
)
