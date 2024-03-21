import eslintConfigPrettier from "eslint-config-prettier"


/**@type import("@types/eslint").Linter.BaseConfig */
export default [{
    env: {
      browser: false,
      es2021: true,
      node: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 13,
      sourceType: "module",
    },
    plugins: ["@typescript-eslint", "prettier"],
    rules: {
      "prettier/prettier": ["warn"],
    },
  }, eslintConfigPrettier];
