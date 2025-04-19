/**
 * 代码高亮工具
 */
import escapeHtml from "escape-html";
import prism from "prismjs";

// 导入语言支持
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

  // 语言别名映射
  const langMap: Record<string, string> = {
    vue: "markup",
    html: "markup",
    md: "markdown",
    ts: "typescript",
    js: "javascript"
  };

  const normalizedLang = langMap[lang] || lang;

  if (!prism.languages[normalizedLang]) {
    try {
      // 动态加载语言
      import(/* @vite-ignore */ `prismjs/components/prism-${normalizedLang}.js`);
    } catch (e) {
      console.warn(`语法高亮不支持 "${normalizedLang}" 语言`);
    }
  }

  if (prism.languages[normalizedLang]) {
    return prism.highlight(str, prism.languages[normalizedLang], normalizedLang);
  }

  return escapeHtml(str);
}

/**
 * 处理Vue SFC文件的语法高亮
 */
function highlightSFC(source: string): string {
  const result: string[] = [];

  // 提取Vue SFC各部分
  const templateMatch = source.match(/<template>([\s\S]+)<\/template>/);
  const scriptMatch = source.match(/<script.*>([\s\S]+)<\/script>/);
  const styleMatch = source.match(/<style.*>([\s\S]+)<\/style>/);

  // 处理template部分
  if (templateMatch) {
    result.push(highlightVueBlock(templateMatch[0], "markup"));
  }

  // 处理script部分
  if (scriptMatch) {
    const langMatch = scriptMatch[0].match(/lang="(\w+)"/);
    const lang = langMatch && langMatch[1] ? langMatch[1] : "javascript";
    result.push(highlightVueBlock(scriptMatch[0], lang === "ts" ? "typescript" : "javascript"));
  }

  // 处理style部分
  if (styleMatch) {
    const langMatch = styleMatch[0].match(/lang="(\w+)"/);
    const lang = langMatch && langMatch[1] ? langMatch[1] : "css";
    result.push(highlightVueBlock(styleMatch[0], lang === "scss" ? "scss" : "css"));
  }

  return result.length > 0 ? result.join("\n") : escapeHtml(source);
}

/**
 * 高亮Vue SFC的各个块
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
