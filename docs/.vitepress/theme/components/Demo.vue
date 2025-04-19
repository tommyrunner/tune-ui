<template>
  <div class="demo-block-wrapper">
    <div class="demo-container">
      <div class="demo-content">
        <slot></slot>
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
        <div class="code-wrapper">
          <slot v-if="$slots.code" name="code"></slot>
          <pre v-else v-html="highlightedCode"></pre>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

interface PropsType {
  componentName: string;
}

const props = withDefaults(defineProps<PropsType>(), {});

// 展开状态
const isExpanded = ref(false);

// 复制状态
const copied = ref(false);

// 源代码内容
const sourceCode = ref("");

// 高亮后的代码
const highlightedCode = computed(() => {
  if (!sourceCode.value) return "";
  return sourceCode.value;
});

// GitHub链接
const githubHref = computed(() => {
  const { componentName } = props;
  return componentName
    ? `https://github1s.com/tommyrunner/tune-ui/tree/master/src/packages/${componentName}`
    : "https://github1s.com/tommyrunner/tune-ui";
});

// 切换展开状态
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

// 打开GitHub源码
const openGithub = () => {
  window.open(githubHref.value, "_blank");
};

// 获取代码
const getSourceCode = () => {
  // 优先使用插槽提供的代码
  if (document.querySelector(".code-wrapper pre")) {
    const highlight = document.querySelector(".code-wrapper pre");
    return highlight ? highlight.textContent || "" : "";
  }

  // 否则使用sourceCode
  return sourceCode.value;
};

// 复制代码
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
</script>

<style scoped>
.demo-block-wrapper {
  margin: 24px 0;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider-light);
  transition: all 0.2s;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.demo-container {
  padding: 28px 32px;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg);
  border-bottom: 1px dashed var(--vp-c-divider-light);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px 12px 0 0;
}

.demo-block-wrapper:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.demo-block-control {
  height: 44px;
  box-sizing: border-box;
  background-color: var(--vp-c-bg-soft);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--vp-c-text-2);
  padding: 0 16px;
  position: relative;
  transition: all 0.3s;
  font-size: 14px;
}

.left-placeholder {
  flex: 1;
}

.control-center {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 16px;
}

.control-center:hover {
  color: var(--vp-c-brand);
}

.arrow-icon {
  margin-left: 6px;
  transition: transform 0.3s;
  opacity: 0.7;
}

.control-center:hover .arrow-icon {
  opacity: 1;
}

.arrow-icon.is-expanded {
  transform: rotate(180deg);
}

.demo-block-code {
  background-color: var(--vp-code-block-bg);
  overflow: hidden;
}

.operation-icons {
  display: flex;
  gap: 8px;
  flex: 1;
  justify-content: flex-end;
}

.operation-icon {
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 0.2s;
  padding: 2px;
  border-radius: 4px;
}

.operation-icon:hover {
  opacity: 1;
}

.operation-icon.copied {
  opacity: 1;
  animation: pulse 0.4s ease-in-out;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.code-wrapper {
  padding: 20px;
  overflow: auto;
  font-size: 14px;
  line-height: 1.6;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
