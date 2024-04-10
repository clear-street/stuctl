/**
 * See documentation for {@link https://prettier.io/docs/en/options.html Prettier Options}.
 */
module.exports = {
  /**
   * Indent lines with tabs instead of spaces. (Tabs will be used for indentation but Prettier uses spaces to align things, such as in ternaries. This behavior is known as SmartTabs.)
   */
  useTabs: false,
  /**
   * Print trailing commas wherever possible in multi-line comma-separated syntactic structures. (A single-line array, for example, never gets trailing commas.)
   */
  trailingComma: 'es5',
  /**
   * Use single quotes instead of double quotes.
   */
  singleQuote: true,

  /**
   * Use single quotes instead of double quotes in JSX.
   */
  jsxSingleQuote: false,
  /**
   * Print spaces between brackets in object literals.
   */
  bracketSpacing: true,
  /**
   * Print semicolons at the ends of statements.
   */
  semi: true,
  /**
   * Specify the line length that the printer will wrap on. NOTE: Setting a print width of 80 will destructure imports at the top of file. While this is undesirable and can be overriden with `printWidth: 9999`, not having a limited print width will prompt prettier to collapse JSX component props to single-line, which in comparison makes destructured imports lesser of the two evils.
   */
  printWidth: 120,
  /**
   * Include parentheses around a sole arrow function parameter.
   */
  arrowParens: 'always',

  /**
   * See {@link https://github.com/IanVS/prettier-plugin-sort-imports doc}.
   */
  importOrder: ['^@[a-zA-Z]+/(.*)$', '^[a-zA-Z-\\/]+$', '^[./]'],
  /**
   * See {@link https://prettier.io/docs/en/plugins.html Prettier Plugins}.
   */
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  overrides: [
    {
      files: 'package.json',
      options: {
        useTabs: false,
      },
    },
  ],
};
