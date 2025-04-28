<template>
  <div class="test-container">
    <h2>系统设置</h2>
    <!-- 主题设置 -->
    <test-section title="主题颜色配置">
      <div class="theme-color-section">
        <!-- 横向布局的颜色选择器 -->
        <div class="theme-colors-row">
          <div class="color-item" v-for="(_, key) in themeColors" :key="key">
            <div class="color-info">
              <div class="color-label">{{ themeLabels[key] }}</div>
              <t-color-picker v-model="themeColors[key]" @change="handleThemeChange(key)" />
              <div class="color-value">{{ themeColors[key] }}</div>
            </div>
          </div>
        </div>

        <!-- 按钮示例 -->
        <div class="theme-preview">
          <h3 class="preview-title">颜色预览</h3>
          <div class="buttons-preview">
            <t-button>默认按钮</t-button>
            <t-button type="primary">主要按钮</t-button>
            <t-button type="success">成功按钮</t-button>
            <t-button type="warning">警告按钮</t-button>
            <t-button type="danger">危险按钮</t-button>
            <t-button type="info">信息按钮</t-button>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 元素尺寸设置 -->
    <test-section title="元素默认尺寸">
      <div class="size-settings">
        <t-radio-group v-model="elementSize" @change="handleSizeChange">
          <t-radio value="small">小尺寸</t-radio>
          <t-radio value="default">默认尺寸</t-radio>
          <t-radio value="large">大尺寸</t-radio>
        </t-radio-group>
        <div class="size-preview">
          <div class="preview-items">
            <t-button type="primary">按钮预览</t-button>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 配置预览 -->
    <test-section title="当前配置">
      <div class="config-preview">
        <t-flex justify="center">
          <t-card class="preview-card" style="width: 100%">
            <template #header>
              <div class="preview-card-header">
                <t-icon icon="setting" />
                <span>当前配置信息</span>
              </div>
            </template>
            <pre class="config-code">{{ configOptions }}</pre>
          </t-card>
        </t-flex>
      </div>
    </test-section>

    <!-- 重置设置 -->
    <test-section title="重置设置">
      <div class="reset-settings">
        <t-button type="primary" @click="resetAllSettings">重置所有设置</t-button>
        <t-button type="danger" @click="resetThemeSettings" style="margin-left: 12px">重置主题颜色</t-button>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { TButton } from "@/packages/button";
import { TRadio, TRadioGroup } from "@/packages/radio";
import { TColorPicker } from "@/packages/color-picker";
import { TCard } from "@/packages/card";
import { TFlex } from "@/packages/flex";
import { TIcon } from "@/packages/icon";
import { TMessage } from "@/packages/message";
import TestSection from "./components/test-section.vue";
import { useOptions } from "@/hooks/useOptions";
import type { OptionsThemeType } from "@/hooks/useOptions/type";

defineOptions({ name: "SettingsTest" });

// 使用全局配置API
const { updateThemeColor, updateDefaultSize, configOptions, initOptions } = useOptions();

// 主题颜色标签映射
const themeLabels = {
  primary: "主要颜色",
  success: "成功颜色",
  warning: "警告颜色",
  danger: "危险颜色",
  info: "信息颜色",
  dark: "深色",
  light: "浅色"
};

// 主题颜色数据
const themeColors = reactive<OptionsThemeType>({ ...configOptions.value.theme });

// 元素尺寸
const elementSize = ref(configOptions.value.elSize || "default");

/**
 * 处理主题颜色变更
 * @param {string} key - 颜色类型
 */
const handleThemeChange = (key: keyof OptionsThemeType) => {
  const themeUpdate = { [key]: themeColors[key] } as OptionsThemeType;
  console.log(themeUpdate);
  updateThemeColor(themeUpdate);
  TMessage.success(`${themeLabels[key]}已更新为 ${themeColors[key]}`);
};

/**
 * 处理尺寸变更
 */
const handleSizeChange = () => {
  updateDefaultSize(elementSize.value);
  TMessage.success(
    `元素默认尺寸已更新为${elementSize.value === "small" ? "小" : elementSize.value === "large" ? "大" : "默认"}尺寸`
  );
};

/**
 * 重置所有设置
 */
const resetAllSettings = () => {
  const defaultOptions = initOptions();

  // 重置主题颜色
  Object.keys(defaultOptions.theme).forEach(key => {
    themeColors[key as keyof OptionsThemeType] = defaultOptions.theme[key as keyof OptionsThemeType];
  });
  updateThemeColor(themeColors);

  // 重置元素尺寸
  elementSize.value = defaultOptions.elSize;
  updateDefaultSize(defaultOptions.elSize);

  TMessage.success("已重置所有设置");
};

/**
 * 重置主题设置
 */
const resetThemeSettings = () => {
  const defaultOptions = initOptions();

  // 重置主题颜色
  Object.keys(defaultOptions.theme).forEach(key => {
    themeColors[key as keyof OptionsThemeType] = defaultOptions.theme[key as keyof OptionsThemeType];
  });
  updateThemeColor(themeColors);

  TMessage.success("已重置主题颜色");
};
</script>

<style lang="scss" scoped>
.test-container {
  padding: 24px;

  h2 {
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 28px;
    color: #1f2937;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 12px;
  }

  .theme-color-section {
    display: flex;
    flex-direction: column;
    gap: 36px;
  }

  .theme-colors-row {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
  }

  .color-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  .color-swatch {
    width: 36px;
    border-radius: 6px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .color-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .color-label {
    font-size: 14px;
    font-weight: 500;
    color: #4b5563;
  }

  .color-value {
    font-size: 12px;
    color: #6b7280;
    font-family: monospace;
  }

  .theme-preview {
    margin-top: 16px;
    padding: 24px;
    background-color: #f9fafb;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
  }

  .preview-title {
    margin-bottom: 16px;
    font-weight: 500;
    font-size: 16px;
    color: #374151;
  }

  .buttons-preview {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .size-settings {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .size-preview {
    margin-top: 12px;
    padding: 20px;
    background-color: #f9fafb;
    border-radius: 8px;
  }

  .preview-items {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    align-items: center;
  }

  .config-preview {
    margin-top: 16px;
  }

  .preview-card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
  }

  .config-code {
    background-color: #f9fafb;
    padding: 16px;
    border-radius: 8px;
    font-family: monospace;
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
    color: #4b5563;
    white-space: pre-wrap;
    word-break: break-all;
  }

  .reset-settings {
    display: flex;
    margin-top: 8px;
  }
}
</style>
