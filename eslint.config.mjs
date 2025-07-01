// eslint.config.mjs
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// 动态读取 .eslintrc-auto-import.json 文件内容
const autoImportConfig = JSON.parse(
  readFileSync(
    resolve(dirname(fileURLToPath(import.meta.url)), ".eslintrc-auto-import.json"),
    "utf-8",
  ),
);

import globals from "globals";
import js from "@eslint/js";

// ESLint 核心插件
import pluginVue from "eslint-plugin-vue";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";

// Prettier 插件及配置
import configPrettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";

// 解析器
import * as parserVue from "vue-eslint-parser";
import * as parserTypeScript from "@typescript-eslint/parser";

// 定义 ESLint 配置
export default [
  // 通用 JavaScript/TypeScript 配置
  {
    ...js.configs.recommended,
    ignores: [
      "/dist",
      "/public",
      "/node_modules",
      "**/*.min.js",
      "**/*.config.mjs",
      "**/*.tsbuildinfo",
      "/src/manifest.json",
    ],
    languageOptions: {
      globals: {
        ...globals.browser, // 浏览器变量 (window, document 等)
        ...globals.node, // Node.js 变量 (process, require 等)
        ...autoImportConfig.globals,
        ...{
          uni: "readonly", // uni-app 全局对象
        },
      },
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...configPrettier.rules,
      ...pluginPrettier.configs.recommended.rules,
      "no-debug": "off", // 允许使用 debugger
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto", // 解决换行符冲突
        },
      ],
    },
  },

  // TypeScript 配置
  {
    files: ["**/*.?([cm])ts"],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": pluginTypeScript,
    },
    rules: {
      ...pluginTypeScript.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off", // 允许使用 any
      "@typescript-eslint/no-empty-function": "off", // 允许空函数
      "@typescript-eslint/no-empty-object-type": "off", // 允许空对象类型
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { disallowTypeAnnotations: false, fixStyle: "inline-type-imports" },
      ], // 统一类型导入风格
    },
  },

  // TypeScript 声明文件的特殊配置
  {
    files: ["**/*.d.ts"],
    rules: {
      "eslint-comments/no-unlimited-disable": "off", // 关闭 eslint 注释相关规则
      "unused-imports/no-unused-vars": "off", // 忽略未使用的导入
    },
  },

  // JavaScript (commonjs) 配置
  {
    files: ["**/*.?([cm])js"],
    rules: {
      "@typescript-eslint/no-var-requires": "off", // 允许 require
    },
  },

  // Vue 文件配置
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: "@typescript-eslint/parser",
        sourceType: "module",
      },
    },
    plugins: {
      vue: pluginVue,
    },
    processor: pluginVue.processors[".vue"],
    rules: {
      ...pluginVue.configs["vue3-recommended"].rules,
      "vue/no-v-html": "off", // 允许 v-html
      "vue/require-default-prop": "off", // 允许没有默认值的 prop
      "vue/multi-word-component-names": "off", // 关闭组件名称多词要求
      "vue/html-self-closing": [
        "error",
        {
          html: { void: "always", normal: "always", component: "always" },
          svg: "always",
          math: "always",
        },
      ], // 自闭合标签
    },
  },
];
