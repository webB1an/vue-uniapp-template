# VUE-UNIAPP-TEMPLATE

## 启动

依赖安装

```
pnpm install
```

h5 启动

```
pnpm run dev:h5
```

## 集成

基于 uniapp + vue3 + typescript 开发，集成 eslint、prettier、stylelint、husky、lint-staged、commitizen、cz-git 等工具，确保代码规范与质量。

- 代码规范化相关
  - eslint
  - prettier
  - Stylelint
  - typescript
  - pinia
- git 规范化相关
  - husky：git 钩子工具，可以设置在 git 各个阶段（pre-commit、commit-msg 等）触发
  - lint-staged：每次提交代码之前，自动对暂存区的文件进行代码检查和格式化，确保代码质量
  - commitlint：是自动化检查 git提 交信息是否符合预定义的规范‌，确保团队协作中提交信息的一致性、可读性和可追溯性。
  - commitizen 和 cz-git
    - commitizen：是一个帮助开发者以标准化格式生成提交信息的工具。
    - cz-git： 是 commitizen 的适配器之一，它基于 commitizen，提供了更多自定义功能和增强的交互体验。 
- sass
- unocss： 一个高性能、灵活且按需生成的原子化 CSS 引擎
- 按需自动导入
- 反选代理
- [wot-design-uni](https://wot-design-uni.pages.dev/component/button.html)
