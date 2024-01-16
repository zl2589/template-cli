module.exports = {
  // 删除 parser
  // 修改extends
  extends: ["plugin:vue/vue3-essential"],
  plugins: [
    // 调整html为vue
    "vue",
  ],
  parserOptions: {
    ecmaVersion: 10,
  },
  rules: {
    "max-len": ["error", 200],
    "max-lines": 0,
    "vue/no-unused-components": 0,
    "no-console": 0,
    indent: 0,
    "no-unused-vars": 1,
    complexity: 0,
  },
};
