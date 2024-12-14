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
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: 'src/styles/globals.css',
  tailwindConfig: 'src/styles/globals.css'
}

export default prettierConfig
