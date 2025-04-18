<template>
  <div class="demo-block-wrapper">
    <div class="demo-container">
      <div class="demo-content">
        <slot></slot>
      </div>
    </div>

    <!-- 代码控制器 -->
    <div class="demo-block-control" @click="toggleExpand">
      <span>{{ isExpanded ? "隐藏代码" : "显示代码" }}</span>
      <svg class="arrow-icon" :class="{ 'is-expanded': isExpanded }" viewBox="0 0 1024 1024" width="12" height="12">
        <path d="M512 768l448-448L904 264 512 656 120 264 64 320z" fill="currentColor"></path>
      </svg>
    </div>

    <!-- 代码展示区域 -->
    <transition name="expand">
      <div v-show="isExpanded" class="demo-block-code">
        <div class="operation-bar">
          <button class="operation-button tooltip" :class="{ copied }" data-tooltip="复制代码" @click.stop="copyCode">
            <svg v-if="!copied" viewBox="0 0 1024 1024" width="16" height="16">
              <path
                d="M810.666667 213.333333a85.333333 85.333333 0 0 1 85.333333 85.333334v469.333333a85.333333 85.333333 0 0 1-85.333333 85.333333h-85.333334v-64h85.333334a21.333333 21.333333 0 0 0 21.333333-21.333333V298.666667a21.333333 21.333333 0 0 0-21.333333-21.333334H384a21.333333 21.333333 0 0 0-21.333333 21.333334v85.333333H298.666667v-85.333333a85.333333 85.333333 0 0 1 85.333333-85.333334h426.666667zM298.666667 384h426.666666a85.333333 85.333333 0 0 1 85.333334 85.333333v426.666667a85.333333 85.333333 0 0 1-85.333334 85.333333H298.666667a85.333333 85.333333 0 0 1-85.333334-85.333333V469.333333a85.333333 85.333333 0 0 1 85.333334-85.333333z m0 64a21.333333 21.333333 0 0 0-21.333334 21.333333v426.666667a21.333333 21.333333 0 0 0 21.333334 21.333333h426.666666a21.333333 21.333333 0 0 0 21.333334-21.333333V469.333333a21.333333 21.333333 0 0 0-21.333334-21.333333H298.666667z"
                fill="currentColor"
              ></path>
            </svg>
            <svg v-else viewBox="0 0 1024 1024" width="16" height="16">
              <path
                d="M384 768a64 64 0 0 1-64-64V352a64 64 0 0 1 64-64h256a64 64 0 0 1 64 64v352a64 64 0 0 1-64 64H384m-16-64h288a16 16 0 0 0 16-16V352a16 16 0 0 0-16-16H368a16 16 0 0 0-16 16v336a16 16 0 0 0 16 16"
                fill="currentColor"
              ></path>
              <path
                d="M695.936 202.24 512 384 328.064 202.24l45.248-45.248L480 262.688V0h64v262.688l106.688-105.696z"
                fill="currentColor"
              ></path>
            </svg>
            <span>{{ copied ? "已复制" : "复制代码" }}</span>
          </button>

          <a class="operation-button tooltip" data-tooltip="GitHub 源码" :href="sourceUrl" target="_blank" @click.stop>
            <svg viewBox="0 0 1024 1024" width="16" height="16">
              <path
                d="M511.984 95.984c-235.936 0-415.984 180.048-415.984 416.016 0 223.36 152.8 405.936 351.984 456.016 0.992 0 2.976 0.992 2.976 0.992 19.008 4 22.016-8 22.016-16v-54.016c-127.008 16-154.016-62.016-154.016-62.016-6.016-20.992-24-42.016-24-42.016-20.992-14.016 0-14.016 0-14.016 23.008 2.016 34.016 24 34.016 24 20 33.984 52.992 24 68 19.008 0-14.016 5.024-24 10.016-30.016-112-12.992-228.992-56.992-228.992-248.992 0-62.016 22.016-112 58.016-150.016-6.016-16-26.016-76 4.992-160 0 0 1.984-0.992 6.016-0.992 16.992 0.992 62.016 24 128 93.984 40-10.992 82.016-16.992 124-16.992s84 6.016 124 16.992c66.016-70.016 110.016-92.992 126.016-92.992 4.992 0 6.016 0.992 6.016 0.992 32 84.992 12 144 6.016 160 36 38.016 58.016 88 58.016 150.016 0 192-116.992 236-228.992 248.992 8 8 14.016 22.016 14.016 44v99.008c0 8 3.008 20 22.016 16 0 0 1.984-0.992 2.976-0.992 199.008-50.016 352-232.64 352-456 0-235.968-192-416.016-416-416.016z"
                fill="currentColor"
              ></path>
            </svg>
            <span>查看源码</span>
          </a>
        </div>

        <div class="code-wrapper">
          <slot v-if="$slots.code" name="code"></slot>
          <pre v-else v-html="highlightedCode"></pre>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  // 源组件名称，用于自动读取examples目录下的源代码
  componentName: {
    type: String,
    default: ""
  },
  // GitHub源码路径
  sourceUrl: {
    type: String,
    default: "https://github1s.com/tommyrunner/tune-ui"
  }
});

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

// 切换展开状态
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;

  // 如果是展开且没有源代码，尝试加载
  if (isExpanded.value && !sourceCode.value && props.componentName) {
    loadComponentSource();
  }
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

// 加载组件源代码
const loadComponentSource = async () => {
  try {
    if (!props.componentName) return;

    // 尝试从指定目录加载源代码
    const response = await fetch(`/examples/button/${props.componentName}.vue`);
    if (!response.ok) {
      console.error(`Failed to load component source: ${response.statusText}`);
      return;
    }

    sourceCode.value = await response.text();
  } catch (error) {
    console.error("Error loading component source:", error);
  }
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

// 组件挂载时，如果提供了组件名，预加载源代码
onMounted(() => {
  if (props.componentName) {
    // 预加载但不显示
    loadComponentSource();
  }
});
</script>

<style scoped>
.demo-block-wrapper {
  margin: 24px 0;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider-light);
  transition: all 0.2s;
  overflow: hidden;
}

.demo-container {
  padding: 26px 32px;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg);
  border-bottom: 1px dashed var(--vp-c-divider-light);
}

.demo-block-wrapper:hover {
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}

.demo-block-control {
  border-top: 1px solid var(--vp-c-divider-light);
  height: 44px;
  box-sizing: border-box;
  background-color: var(--vp-c-bg-soft);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--vp-c-text-2);
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
}

.demo-block-control:hover {
  color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft-up);
}

.arrow-icon {
  margin-left: 6px;
  transition: transform 0.3s;
}

.arrow-icon.is-expanded {
  transform: rotate(180deg);
}

.demo-block-code {
  background-color: var(--vp-code-block-bg);
  overflow: hidden;
}

.operation-bar {
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px solid var(--vp-c-divider-dark);
}

.operation-button {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  margin-left: 10px;
  font-size: 12px;
  border-radius: 4px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.operation-button:hover {
  color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft-up);
  border-color: var(--vp-c-brand-light);
}

.operation-button.copied {
  color: var(--vp-c-green);
}

.operation-button svg {
  margin-right: 6px;
}

.code-wrapper {
  padding: 20px;
  overflow: auto;
}

.tooltip {
  position: relative;
}

.tooltip::before {
  content: attr(data-tooltip);
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 4px;
  font-size: 12px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  white-space: nowrap;
}

.tooltip:hover::before {
  opacity: 1;
  visibility: visible;
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
