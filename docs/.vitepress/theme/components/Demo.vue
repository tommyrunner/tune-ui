<template>
  <div class="demo-block-wrapper">
    <div class="demo-container">
      <div class="demo-content">
        <!-- 组件加载状态 -->
        <div v-if="isComponentLoading" class="loading-container">
          <div class="loading-spinner"></div>
          <span>组件加载中...</span>
        </div>
        <component v-else :is="demoComponent" />
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

<script lang="ts" setup>
import { ref, computed, onMounted, defineAsyncComponent } from "vue";
import { highlight } from "../../utils/highlight";

interface PropsType {
  componentName?: string;
  examples?: string;
}

const props = withDefaults(defineProps<PropsType>(), {
  componentName: "",
  examples: ""
});

// 状态管理
const isExpanded = ref(false);
const copied = ref(false);
const sourceCode = ref("");
const isComponentLoading = ref(true);
const isCodeLoading = ref(false);

// 组件路径
const componentPath = computed(() => {
  if (props.componentName && props.examples) {
    return `/examples/${props.componentName}/${props.examples}.vue`;
  }
  return "";
});

// 动态导入组件
const demoComponent = computed(() => {
  if (componentPath.value) {
    const asyncComponent = defineAsyncComponent({
      loader: () => import(/* @vite-ignore */ componentPath.value),
      delay: 0,
      onError(error, retry, fail, attempts) {
        if (attempts <= 3) {
          console.warn(`组件加载失败，正在重试 (${attempts}/3)...`);
          retry();
        } else {
          console.error("组件加载失败:", error);
          fail();
          isComponentLoading.value = false;
        }
      }
    });

    return asyncComponent;
  }
  return {} as any;
});

// 代码高亮处理
const highlightedCode = computed(() => {
  if (!sourceCode.value) return "";
  return highlight(sourceCode.value, "vue");
});

// GitHub链接
const githubHref = computed(() => {
  const { componentName } = props;
  return componentName
    ? `https://github1s.com/tommyrunner/tune-ui/tree/master/src/packages/${componentName}`
    : "https://github1s.com/tommyrunner/tune-ui";
});

// 加载源代码
const loadSourceCode = async () => {
  try {
    if (componentPath.value) {
      isCodeLoading.value = true;
      const code = await import(/* @vite-ignore */ `${componentPath.value}?raw`);
      sourceCode.value = code.default;
    }
  } catch (error) {
    console.error("加载源代码失败:", error);
  } finally {
    isCodeLoading.value = false;
  }
};

// 切换展开状态
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
  if (isExpanded.value && !sourceCode.value) {
    loadSourceCode();
  }
};

// 打开GitHub源码
const openGithub = () => {
  window.open(githubHref.value, "_blank");
};

// 获取并复制代码
const getSourceCode = () => {
  const highlight = document.querySelector(".code-wrapper pre");
  return highlight?.textContent || sourceCode.value || "";
};

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
  setTimeout(() => {
    isComponentLoading.value = false;
  }, 300);

  if (componentPath.value) {
    loadSourceCode();
  }
});
</script>
