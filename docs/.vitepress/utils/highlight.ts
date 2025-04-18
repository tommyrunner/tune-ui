/**
 * 代码高亮工具
 */
import escapeHtml from "escape-html";
import prism from "prismjs";

// 导入其他语言的支持
import "prismjs/components/prism-bash";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-javascript";

/**
 * 代码高亮处理
 * @param str 代码字符串
 * @param lang 语言
 * @returns 高亮处理后的HTML字符串
 */
export function highlight(str: string, lang: string): string {
  if (!lang) {
    return escapeHtml(str);
  }

  // 处理Vue SFC语法
  if (lang === "vue") {
    return highlightSFC(str);
  }

  // 非Vue语法直接使用Prism处理
  lang = lang.toLowerCase();
  const rawLang = lang;

  if (lang === "vue" || lang === "html") {
    lang = "markup";
  }

  if (lang === "md") {
    lang = "markdown";
  }

  if (lang === "ts") {
    lang = "typescript";
  }

  if (lang === "js") {
    lang = "javascript";
  }

  if (!prism.languages[lang]) {
    try {
      // 动态加载语言
      import(`prismjs/components/prism-${lang}.js`);
    } catch (e) {
      console.warn(`Syntax highlight for language "${lang}" is not supported.`);
    }
  }

  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang);
    return code;
  }

  return escapeHtml(str);
}

/**
 * 处理Vue SFC文件的语法高亮
 * @param source Vue源代码
 * @returns 高亮后的HTML
 */
function highlightSFC(source: string): string {
  const result: string[] = [];

  // 简单解析Vue SFC的各部分 - 实际情况应该使用vue/compiler-sfc
  const templateMatch = source.match(/<template>([\s\S]+)<\/template>/);
  const scriptMatch = source.match(/<script.*>([\s\S]+)<\/script>/);
  const scriptSetupMatch = source.match(/<script.*setup.*>([\s\S]+)<\/script>/);
  const styleMatch = source.match(/<style.*>([\s\S]+)<\/style>/);

  // 处理template部分
  if (templateMatch) {
    const template = templateMatch[0];
    const highlightedTemplate = highlightVueBlock(template, "markup");
    result.push(highlightedTemplate);
  }

  // 处理script部分
  if (scriptMatch) {
    const script = scriptMatch[0];
    const langMatch = script.match(/lang="(\w+)"/);
    const lang = langMatch && langMatch[1] ? langMatch[1] : "javascript";
    const highlightedScript = highlightVueBlock(script, lang === "ts" ? "typescript" : "javascript");
    result.push(highlightedScript);
  }

  // 处理style部分
  if (styleMatch) {
    const style = styleMatch[0];
    const langMatch = style.match(/lang="(\w+)"/);
    const lang = langMatch && langMatch[1] ? langMatch[1] : "css";
    const highlightedStyle = highlightVueBlock(style, lang === "scss" ? "scss" : "css");
    result.push(highlightedStyle);
  }

  return result.length > 0 ? result.join("\n") : escapeHtml(source);
}

/**
 * 高亮Vue SFC的各个块
 * @param block 代码块
 * @param lang 语言
 * @returns 高亮后的HTML
 */
function highlightVueBlock(block: string, lang: string): string {
  // 提取内容
  const openTag = block.match(/^<\w+.*>/);
  const content = block.replace(/^<\w+.*>/, "").replace(/<\/\w+>$/, "");
  const closeTag = block.match(/<\/\w+>$/);

  // 高亮标签和内容
  const highlightedOpenTag = openTag
    ? `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>${openTag[0].slice(1, -1)}</span><span class="token punctuation">&gt;</span></span>`
    : "";
  const highlightedContent = content ? prism.highlight(content, prism.languages[lang], lang) : "";
  const highlightedCloseTag = closeTag
    ? `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>${closeTag[0].slice(2, -1)}</span><span class="token punctuation">&gt;</span></span>`
    : "";

  return `${highlightedOpenTag}${highlightedContent}${highlightedCloseTag}`;
}
