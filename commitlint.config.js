export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新功能
        "fix", // 修复bug
        "docs", // 文档更新
        "style", // 代码风格相关，不影响运行结果
        "refactor", // 重构代码，既不是新增功能，也不是修改bug
        "perf", // 性能优化
        "test", // 新增测试
        "chore", // 构建过程或辅助工具的变动
        "revert", // 回退
        "build", // 打包构建
        "ci" // 持续集成相关
      ]
    ],
    "subject-case": [0], // 提交消息主题的格式不做限制
    "body-leading-blank": [1, "always"], // body前需要空一行
    "footer-leading-blank": [1, "always"] // footer前需要空一行
  }
};
