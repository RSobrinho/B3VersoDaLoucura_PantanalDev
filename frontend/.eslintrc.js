module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "prettier", "plugin:react/recommended"],
  overrides: [
    {
      files: ["*.js", "*.spec.js"],
      rules: {
        "no-useless-constructor": "off",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["prettier", "react"],
  rules: {
    "dot-notation": "off",
    "spaced-comment": "off",
    "no-console": "warn",
    "consistent-return": "off",
    "func-names": "off",
    "object-shorthand": "off",
    "no-process-exit": "off",
    "no-param-reassign": "off",
    "no-return-await": "off",
    "no-underscore-dangle": "off",
    "no-unused-vars": "off",
    "class-methods-use-this": "off",
    "no-undef": "off",
    "react/display-name": "off",
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",
    "prefer-destructuring": ["error", { object: true, array: false }],
  },
};
