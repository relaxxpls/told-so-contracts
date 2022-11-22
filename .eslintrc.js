module.exports = {
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  env: { mocha: true },
  extends: ["eslint-config-web/typescript"],
};
