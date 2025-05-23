<template>
  <div class="demo-block-wrapper">
    <div class="demo-container">
      <div class="demo-content">
        <component :is="props.component" />
      </div>
    </div>

    <!-- 代码控制器 -->
    <div class="demo-block-control">
      <div class="left-placeholder"></div>
      <div class="control-center" @click="toggleExpand">
        <span>{{ isExpanded ? "隐藏代码" : "显示代码" }}</span>
        <img
          class="arrow-icon"
          :class="{ 'is-expanded': isExpanded }"
          src="/images/arrow-dow.png"
          alt="箭头"
          width="18"
          height="18"
        />
      </div>
      <div class="operation-icons">
        <img
          class="operation-icon"
          :class="{ copied }"
          src="/images/copy.png"
          alt="复制"
          width="24"
          height="24"
          @click.stop="copyCode"
          title="复制代码"
        />
        <img
          class="operation-icon"
          src="/images/github.png"
          alt="GitHub"
          width="24"
          height="24"
          @click.stop="openGithub"
          title="查看GitHub源码"
        />
      </div>
    </div>

    <!-- 代码展示区域 -->
    <transition name="expand">
      <div v-show="isExpanded" class="demo-block-code">
        <div v-if="isCodeLoading" class="loading-container code-loading">
          <div class="loading-spinner"></div>
          <span>代码加载中...</span>
        </div>
        <div v-else class="code-wrapper">
          <slot v-if="$slots.code" name="code"></slot>
          <pre v-else class="language-vue"><code class="language-vue" v-html="highlightedCode"></code></pre>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup name="Demo">
import { ref, computed, onMounted, type Component } from "vue";
import { highlight } from "../../utils/highlight";

/**
 * @description Demo组件Props类型定义
 * @interface PropsType
 */
interface PropsType {
  /** 要展示的组件 */
  component: Component;
  /** 组件名称 */
  name: string;
  /** 示例名称 */
  examples: string;
}

const props = withDefaults(defineProps<PropsType>(), {});

// 状态管理
const isExpanded = ref(false);
const copied = ref(false);
const sourceCode = ref("");
const isCodeLoading = ref(false);

/**
 * 组件路径计算
 * @returns {string} 组件示例路径
 */
const componentPath = computed(() => {
  return `/tune-ui/examples/${props.name}/${props.examples}.vue`;
});

/**
 * 代码高亮处理
 * @returns {string} 高亮后的HTML代码
 */
const highlightedCode = computed(() => {
  if (!sourceCode.value) return "";
  return highlight(sourceCode.value, "vue");
});

/**
 * GitHub链接
 * @returns {string} GitHub源码链接
 */
const githubHref = computed(() => {
  return props.name
    ? `https://github1s.com/tommyrunner/tune-ui/tree/master/src/packages/${props.name}`
    : "https://github1s.com/tommyrunner/tune-ui";
});

/**
 * 加载源代码
 * @returns {Promise<void>}
 */
const loadSourceCode = async () => {
  try {
    if (componentPath.value) {
      isCodeLoading.value = true;

      // 判断当前环境
      if (import.meta.env.PROD) {
        // 生产环境：使用fetch请求获取文件内容
        try {
          const response = await fetch(componentPath.value);
          if (!response.ok) {
            throw new Error(`${componentPath.value} 文件不存在`);
          }
          sourceCode.value = await response.text();
        } catch (fetchError) {
          console.error("Fetch加载源代码失败:", fetchError);
          sourceCode.value = `// 无法加载 ${props.name}/${props.examples} 的示例代码`;
        }
      } else {
        // 开发环境：使用import方式加载
        try {
          const code = await import(/* @vite-ignore */ `${componentPath.value}?raw`);
          sourceCode.value = code.default;
        } catch (importError) {
          console.error("Import加载源代码失败:", importError);
          sourceCode.value = `// 无法加载 ${props.name}/${props.examples} 的示例代码`;
        }
      }
    }
  } catch (error) {
    console.error("加载源代码失败:", error);
    sourceCode.value = `// 无法加载 ${props.name}/${props.examples} 的示例代码`;
  } finally {
    isCodeLoading.value = false;
  }
};

/**
 * 切换展开状态
 */
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
  if (isExpanded.value && !sourceCode.value) {
    loadSourceCode();
  }
};

/**
 * 打开GitHub源码
 */
const openGithub = () => {
  window.open(githubHref.value, "_blank");
};

/**
 * 获取源代码文本
 * @returns {string} 源代码文本
 */
const getSourceCode = () => {
  const highlight = document.querySelector(".code-wrapper pre");
  return highlight?.textContent || sourceCode.value || "";
};

/**
 * 复制代码到剪贴板
 */
const copyCode = async () => {
  if (copied.value) return;

  const code = getSourceCode();
  if (code) {
    await navigator.clipboard.writeText(code);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  }
};

// 组件初始化
onMounted(() => {
  // 加载源代码
  if (componentPath.value) {
    loadSourceCode();
  }
});
</script>
