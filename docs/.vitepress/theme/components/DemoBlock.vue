<template>
  <div :class="['demo-block', { 'is-expanded': isExpanded }]">
    <!-- 组件演示区域 -->
    <div class="source">
      <slot></slot>
    </div>

    <!-- 代码控制器 -->
    <div class="demo-block-control" @click="toggleExpand">
      <span>{{ isExpanded ? "隐藏代码" : "显示代码" }}</span>
      <svg class="arrow-icon" viewBox="0 0 1024 1024" width="12" height="12">
        <path d="M512 768l448-448L904 264 512 656 120 264 64 320z" fill="currentColor"></path>
      </svg>
    </div>

    <!-- 代码展示区域 -->
    <div class="meta">
      <div class="operation-bar">
        <button class="operation-button tooltip" :class="{ copied: copied }" data-tooltip="复制代码" @click="copyCode">
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
          {{ copied ? "已复制" : "复制代码" }}
        </button>
        <a class="operation-button tooltip" data-tooltip="在 CodePen 中打开" @click="openInCodePen">
          <svg viewBox="0 0 1024 1024" width="16" height="16">
            <path
              d="M512 0L939.8 213.4v298.2L680.2 597l259.6 85.4v298.2L512 1024l-427.8-213.4V682.4L343.8 597 84.2 511.6V213.4L512 0m0 2.6L86.8 214.3v294.4l259.6 85.4-259.6 85.3v294.5L512 1018l425.2-211.7v-294.4l-259.6-85.4 259.6-85.3v-294.4L512 2.6z"
              fill="currentColor"
            ></path>
            <path
              d="M512 301.8v200.9L361.7 402.2zM565.5 301.8l150.3 100.4-150.3 100.5zM512 756.2V554.3l150.3 101.9zM458.5 756.2L308.2 655.8l150.3-100.5z"
              fill="currentColor"
            ></path>
            <path d="M308.2 402.2L458.5 503 308.2 603.4zM715.8 402.2v201.2L565.5 503z" fill="currentColor"></path>
            <path d="M512 354.9L361.7 454.3 512 553.9l150.3-100.4z" fill="currentColor"></path>
          </svg>
          在 CodePen 中打开
        </a>
      </div>

      <div class="code-wrapper">
        <slot name="highlight"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";

// 展开状态
const isExpanded = ref(false);

// 切换展开状态
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

// 复制代码状态
const copied = ref(false);

// 获取代码字符串
const getSourceCode = () => {
  const highlight = document.querySelector(".code-wrapper code");
  return highlight ? highlight.textContent || "" : "";
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

// 打开 CodePen
const openInCodePen = () => {
  const code = getSourceCode();
  if (!code) return;

  // 从代码中提取 HTML、CSS 和 JavaScript 部分
  let html = "";
  let js = "";
  let css = "";

  try {
    // 简单提取模板、脚本和样式部分
    const htmlMatch = code.match(/<template>([\s\S]*?)<\/template>/);
    const scriptMatch = code.match(/<script[\s\S]*?>([\s\S]*?)<\/script>/);
    const styleMatch = code.match(/<style[\s\S]*?>([\s\S]*?)<\/style>/);

    if (htmlMatch && htmlMatch[1]) {
      html = htmlMatch[1].trim();
    }

    if (scriptMatch && scriptMatch[1]) {
      js = scriptMatch[1].trim();
    }

    if (styleMatch && styleMatch[1]) {
      css = styleMatch[1].trim();
    }
  } catch (e) {
    console.error("解析代码时出错:", e);
  }

  // 创建 CodePen 表单
  const data = {
    html: html,
    js: js,
    css: css,
    js_pre_processor: "babel",
    html_pre_processor: "none",
    css_pre_processor: "scss",
    js_external: "https://unpkg.com/vue@next/dist/vue.global.js,https://unpkg.com/tune-ui/dist/index.js",
    css_external: "https://unpkg.com/tune-ui/dist/index.css",
    editors: "101"
  };

  // 提交表单到 CodePen
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://codepen.io/pen/define";
  form.target = "_blank";
  form.style.display = "none";

  const input = document.createElement("input");
  input.name = "data";
  input.value = JSON.stringify(data);
  form.appendChild(input);

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};
</script>
