import path from 'node:path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { includeIgnoreFile } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const gitignorePath = path.resolve(__dirname, '.gitignore')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

const config = [
  {
    files: ['resources/js/**/*.{ts,tsx,d.ts}'],
  },
  {
    ignores: ['**/*.{js,mjs}'],
  },
  includeIgnoreFile(gitignorePath),
  ...compat.config({
    env: {
      browser: true,
      node: true,
    },
    plugins: ['@typescript-eslint', 'unused-imports', 'prettier'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended-type-checked',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended',
      'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      projectService: true,
      tsconfigRootDir: __dirname,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      'react-hooks/exhaustive-deps': 'off',

      'unused-imports/no-unused-imports': 'error',

      'prettier/prettier': 'error',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }),
]

export default config
