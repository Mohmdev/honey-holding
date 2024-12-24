import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'
import pluginJs from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import pluginReact from 'eslint-plugin-react'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const RULE_SEVERITY = 'off'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  pluginReact.configs.flat.recommended,
  pluginJs.configs.recommended,
  eslintPluginPrettier,
  ...tseslint.configs.recommended,
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ),
  //
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node }
    }
  },
  {
    settings: {
      'import/resolver': {
        typescript: true,
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    }
  },
  {
    rules: {
      'import/extensions': [
        'error',
        'never',
        {
          ignorePackages: true,
          // Force no extensions for these
          pattern: {
            // Catch .js extensions
            '*.js': 'never',
            '*.jsx': 'never',
            '*.ts': 'never',
            '*.tsx': 'never',

            // Catch /index patterns
            '**/index': 'never',
            '**/index.js': 'never',
            '**/index.jsx': 'never',
            '**/index.ts': 'never',
            '**/index.tsx': 'never'
          }
        }
      ],
      // Add no-useless-path-segments to catch /index
      'import/no-useless-path-segments': [
        'error',
        {
          noUselessIndex: true
        }
      ],
      '@typescript-eslint/ban-ts-comment': RULE_SEVERITY,
      '@typescript-eslint/no-empty-object-type': RULE_SEVERITY,
      '@typescript-eslint/no-explicit-any': RULE_SEVERITY,
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
      ],
      'react-hooks/exhaustive-deps': RULE_SEVERITY,
      'import/no-anonymous-default-export': RULE_SEVERITY,
      'no-unused-disable': RULE_SEVERITY,
      'function-paren-newline': RULE_SEVERITY,
      'eslint-comments/no-unused-disable': RULE_SEVERITY
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
