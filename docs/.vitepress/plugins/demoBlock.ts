/**
 * 提供 demo 代码块支持
 */
import MarkdownIt from "markdown-it";
import type { RenderRule } from "markdown-it/lib/renderer";
import Token from "markdown-it/lib/token";
import container from "markdown-it-container";
import { highlight } from "../utils/highlight";

interface ContainerOpts {
  marker?: string | undefined;
  validate?(params: string): boolean;
  render?: RenderRule | undefined;
}

export default (md: MarkdownIt): void => {
  const createContainer = (klass: string, defaultTitle: string, options: ContainerOpts = {}) => {
    const { validate, render, marker = ":" } = options;

    // 使用 markdown-it-container 插件注册自定义容器
    md.use(container, klass, {
      validate:
        validate ||
        ((params: string) => {
          return params.trim().match(new RegExp(`^${marker}\\s+${klass}(?:\\s+(.*))?$`));
        }),

      render:
        render ||
        ((tokens: Token[], idx: number) => {
          const token = tokens[idx];
          const info = token.info.trim().match(new RegExp(`^${marker}\\s+${klass}\\s+(.*)$`));

          if (token.nesting === 1) {
            // 容器开始标签
            const title = info && info[1] ? info[1] : defaultTitle;
            return `<div class="${klass} custom-block"><p class="custom-block-title">${md.utils.escapeHtml(title)}</p>\n`;
          } else {
            // 容器结束标签
            return "</div>\n";
          }
        })
    });
  };

  // 创建演示容器
  md.use(container, "demo", {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens, idx) {
      const token = tokens[idx];
      const info = token.info.trim().match(/^demo\s*(.*)$/);
      const props = {};

      // 解析参数
      if (info && info[1]) {
        const attrs = info[1].trim().split(/\s+/);
        attrs.forEach(attr => {
          const [key, value] = attr.split("=");
          if (key && value) {
            props[key] = value.replace(/["']/g, ""); // 去除引号
          }
        });
      }

      if (token.nesting === 1) {
        // 容器开始
        const content = tokens[idx + 1].content;

        // 构建props字符串
        const propsString = Object.entries(props)
          .map(([key, value]) => `${key}="${value}"`)
          .join(" ");

        // 使用新的Demo组件
        return `<Demo ${propsString}>
                  ${content}
                  <template #code v-if="${!props["componentName"]}">
                `;
      } else {
        // 容器结束
        return props["componentName"] ? "</Demo>" : "</template></Demo>";
      }
    }
  });

  // 常用的自定义容器
  createContainer("tip", "提示");
  createContainer("warning", "警告");
  createContainer("danger", "危险");
  createContainer("info", "信息");
  createContainer("note", "注意");
};
