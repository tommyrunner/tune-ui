import { useData } from "vitepress";

const ZH = "zh-CN";

export const useDemoI18n = () => {
  const { lang } = useData();

  /**
   * 获取国际化文本
   * @returns {Object} 国际化文本对象
   */
  return {
    TEXT_SHOW_CODE: lang.value === ZH ? "显示代码" : "Show Code",
    TEXT_HIDE_CODE: lang.value === ZH ? "隐藏代码" : "Hide Code",
    TEXT_COPY_CODE: lang.value === ZH ? "复制代码" : "Copy Code",
    TEXT_VIEW_SOURCE: lang.value === ZH ? "查看GitHub源码" : "View on GitHub",
    TEXT_LOADING: lang.value === ZH ? "代码加载中..." : "Loading code...",
    TEXT_COPY_SUCCESS: lang.value === ZH ? "复制成功" : "Copied",
    TEXT_LOAD_ERROR: (name: string, example: string) =>
      lang.value === ZH ? `// 无法加载 ${name}/${example} 的示例代码` : `// Failed to load example code for ${name}/${example}`,
    TEXT_ALT_ARROW: lang.value === ZH ? "箭头" : "Arrow",
    TEXT_ALT_COPY: lang.value === ZH ? "复制" : "Copy",
    TEXT_ALT_GITHUB: lang.value === ZH ? "GitHub" : "GitHub",
    TEXT_FILE_NOT_EXIST: (path: string) => (lang.value === ZH ? `${path} 文件不存在` : `File ${path} does not exist`),
    TEXT_FETCH_ERROR: lang.value === ZH ? "Fetch加载源代码失败" : "Failed to load source code via fetch",
    TEXT_IMPORT_ERROR: lang.value === ZH ? "Import加载源代码失败" : "Failed to load source code via import",
    TEXT_LOAD_SOURCE_ERROR: lang.value === ZH ? "加载源代码失败" : "Failed to load source code"
  };
};
