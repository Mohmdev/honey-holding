import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'
import globals from 'globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const RULE_SEVERITY = 'off'

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:prettier/recommended'
  ),
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node }
    }
  },
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': RULE_SEVERITY,
      '@typescript-eslint/no-empty-object-type': RULE_SEVERITY,
      '@typescript-eslint/no-explicit-any': RULE_SEVERITY,
      'react-hooks/exhaustive-deps': RULE_SEVERITY,
      'import/no-anonymous-default-export': RULE_SEVERITY,
      'no-unused-disable': RULE_SEVERITY,
      'function-paren-newline': RULE_SEVERITY,
      'eslint-comments/no-unused-disable': RULE_SEVERITY,
      '@typescript-eslint/no-unused-vars': [
        RULE_SEVERITY,
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)'
        }
      ]
    },
    ignores: [
      '.tmp',
      '**/.git',
      '**/.hg',
      '**/.pnp.*',
      '**/.svn',
      '**/.yarn/**',
      '**/build',
      '**/dist/**',
      '**/node_modules',
      '**/temp',
      'playwright.config.ts',
      'jest.config.js'
    ]
  }
]
export default eslintConfig
