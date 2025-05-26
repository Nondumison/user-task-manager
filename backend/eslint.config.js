const tsPlugin = require("@typescript-eslint/eslint-plugin");

module.exports = [
  {
    files: ["*.ts", "*.tsx"],
    languageOptions: {
      parser: require.resolve("@typescript-eslint/parser"),
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
    ],
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];
