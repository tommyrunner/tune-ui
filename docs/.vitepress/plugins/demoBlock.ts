/**
 * 提供 demo 代码块支持
 */
import MarkdownIt from "markdown-it";
import type { RenderRule } from "markdown-it/lib/renderer";
import Token from "markdown-it/lib/token";
import container from "markdown-it-container";

interface ContainerOpts {
  marker?: string;
  validate?(params: string): boolean;
  render?: RenderRule;
}

export default (md: MarkdownIt): void => {
  // 创建自定义容器的通用函数
  const createContainer = (klass: string, defaultTitle: string, options: ContainerOpts = {}) => {
    const { validate, render, marker = ":" } = options;

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
            const title = info && info[1] ? info[1] : defaultTitle;
            return `<div class="${klass} custom-block"><p class="custom-block-title">${md.utils.escapeHtml(title)}</p>\n`;
          } else {
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
            props[key] = value.replace(/["']/g, "");
          }
        });
      }

      if (token.nesting === 1) {
        const content = tokens[idx + 1].content;
        const propsString = Object.entries(props)
          .map(([key, value]) => `${key}="${value}"`)
          .join(" ");

        const hasComponent = props["componentName"] && props["examples"];
        return `<Demo ${propsString}>
                ${content}
                ${hasComponent ? "" : `<template #code>`}
              `;
      } else {
        const hasComponent = props["componentName"] && props["examples"];
        return hasComponent ? "</Demo>" : "</template></Demo>";
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
