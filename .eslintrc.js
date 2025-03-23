module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    "prettier/prettier": "error",
    "no-console": "off",
    indent: ["error", 2],
    quotes: ["error", "single"],
    semi: ["error", "always"],
  },
};
