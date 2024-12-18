// @ts-check

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import('prettier').Config}
 */
const prettierConfig = {
  trailingComma: 'none',
  arrowParens: 'always',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  semi: false,
  proseWrap: 'preserve',
  embeddedLanguageFormatting: 'auto',
  plugins: [
    'prettier-plugin-tailwindcss',
    '@ianvs/prettier-plugin-sort-imports'
  ],
  tailwindStylesheet: 'src/styles/globals.css',
  tailwindConfig: 'src/styles/globals.css',
  // importOrder config
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<TYPES>^(react/(.*)$)|^(react$)',
    '<TYPES>^(next/(.*)$)|^(next$)',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@providers/(.*)$',
    '^@lib/(.*)$',
    '^@utils/(.*)$',
    '^@hooks/(.*)$',
    '^@/config/(.*)$',
    '^@/(.*)$',
    '',
    '^(@payloadcms/(.*)$)',
    '^@payload-config$',
    '^@CMS/(.*)$',
    '^@services/(.*)$',
    '^@blocks/(.*)$',
    '^@fields/(.*)$',
    '^@access/(.*)$',
    '',
    '<TYPES>.*$',
    '<TYPES><THIRD_PARTY_MODULES>',
    '^types$',
    '^@/types/(.*)$',
    '^@payload-types$',
    '',
    '^@forms/(.*)$',
    '',
    '^@ui/(.*)$',
    '^@graphics/(.*)$',
    '^@icons/(.*)$',
    '^@components/(.*)$',
    '^@admin-components/(.*)$',
    '',
    '^[./]', // Relative imports
    '',
    '^@styles/(.*)$',
    '',
    '^@constants'
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true
}

export default prettierConfig
