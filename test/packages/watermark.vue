<template>
  <div class="test-container">
    <h2>Watermark 水印</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <t-watermark :font="defaultFont" content="TUI Watermark">
        <div class="content-box">
          <p>基础用法展示默认水印效果</p>
          <p>水印可以防止信息盗用</p>
        </div>
      </t-watermark>
    </test-section>

    <!-- 多行水印 -->
    <test-section title="多行水印">
      <t-watermark :font="defaultFont" :content="['TUI Component', 'Vue3 + TypeScript']">
        <div class="content-box">
          <p>多行水印展示</p>
          <p>支持数组形式的多行文本内容</p>
        </div>
      </t-watermark>
    </test-section>

    <!-- 图片水印 -->
    <test-section title="图片水印">
      <t-watermark :width="100" :height="70" image="https://i.postimg.cc/C5k7W9GK/1.webp" :opacity="0.5" :gap="[100, 23]">
        <div class="content-box">
          <p>图片水印展示</p>
          <p>支持使用图片作为水印</p>
          <p>间距: [100, 100]</p>
        </div>
      </t-watermark>
    </test-section>

    <!-- 图片渲染模式测试 -->
    <test-section title="图片渲染模式测试">
      <div class="render-mode-container">
        <t-watermark
          :width="100"
          :height="70"
          :rotate="0"
          image="https://i.postimg.cc/C5k7W9GK/1.webp"
          :opacity="0.6"
          imageMode="contain"
        >
          <div class="content-box">
            <p>渲染模式: contain</p>
            <p>保持比例缩放</p>
          </div>
        </t-watermark>

        <t-watermark
          :width="100"
          :height="70"
          :rotate="0"
          image="https://i.postimg.cc/C5k7W9GK/1.webp"
          :opacity="0.6"
          imageMode="cover"
        >
          <div class="content-box">
            <p>渲染模式: cover</p>
            <p>填满并裁剪</p>
          </div>
        </t-watermark>

        <t-watermark
          :width="100"
          :height="70"
          :rotate="0"
          image="https://i.postimg.cc/C5k7W9GK/1.webp"
          :opacity="0.6"
          imageMode="fill"
        >
          <div class="content-box">
            <p>渲染模式: fill</p>
            <p>拉伸填满</p>
          </div>
        </t-watermark>

        <t-watermark
          :width="100"
          :height="70"
          :rotate="0"
          image="https://i.postimg.cc/C5k7W9GK/1.webp"
          :opacity="0.6"
          imageMode="none"
        >
          <div class="content-box">
            <p>渲染模式: none</p>
            <p>原始尺寸</p>
          </div>
        </t-watermark>
      </div>
    </test-section>

    <!-- 自定义配置 -->
    <test-section title="自定义配置">
      <div class="config-container">
        <div class="config-form">
          <div class="form-item">
            <span class="label">内容:</span>
            <t-input v-model="customConfig.content" />
          </div>

          <div class="form-item">
            <span class="label">颜色:</span>
            <t-color-picker v-model="colorValue" show-alpha @change="updateWatermarkColor" />
          </div>

          <div class="form-item">
            <span class="label">透明度:</span>
            <t-slider v-model="opacity" :min="0" :max="1" :step="0.1" />
          </div>

          <div class="form-item">
            <span class="label">字体大小:</span>
            <t-slider v-model="customConfig.font.fontSize" :min="12" :max="30" />
          </div>

          <div class="form-item">
            <span class="label">旋转角度:</span>
            <t-slider v-model="customConfig.rotate" :min="-90" :max="90" />
          </div>

          <div class="form-item">
            <span class="label">间距X:</span>
            <t-input-number v-model="customConfig.gap[0]" :min="10" :max="200" />
          </div>

          <div class="form-item">
            <span class="label">间距Y:</span>
            <t-input-number v-model="customConfig.gap[1]" :min="10" :max="200" />
          </div>

          <div class="form-item">
            <span class="label">字体粗细:</span>
            <t-select v-model="selectedFontWeight" :options="fontWeightOptions" />
          </div>
        </div>

        <t-watermark
          :content="customConfig.content"
          :font="customConfig.font"
          :rotate="customConfig.rotate"
          :gap="customConfig.gap"
          :opacity="opacity"
          :font-weight="selectedFontWeight"
        >
          <div class="custom-content-box">
            <h3>自定义水印效果</h3>
            <p>您可以通过左侧的控制面板调整水印的各种参数</p>
            <p>包括内容、颜色、透明度、字体大小、旋转角度、间距等</p>
          </div>
        </t-watermark>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { TWatermark } from "@/packages/watermark";
import { TInput } from "@/packages/input";
import { TInputNumber } from "@/packages/input-number";
import { TSlider } from "@/packages/slider";
import { TColorPicker } from "@/packages/color-picker";
import { TSelect } from "@/packages/select";
import TestSection from "../components/test-section.vue";

defineOptions({ name: "WatermarkTest" });

// 默认字体设置
const defaultFont = reactive({
  color: "rgba(0, 0, 0, 0.15)"
});

// 自定义配置
const customConfig = reactive({
  content: "TUI Watermark",
  font: {
    color: "rgba(0, 0, 0, 0.15)",
    fontSize: 16
  },
  rotate: -22,
  gap: [10, 12] as [number, number]
});

const colorValue = ref("rgba(0, 0, 0, 0.15)");
const opacity = ref(0.5);

// 字体粗细选择器
const fontWeightOptions = [
  { label: "细体 (lighter)", value: "lighter" },
  { label: "正常 (normal)", value: "normal" },
  { label: "粗体 (bold)", value: "bold" },
  { label: "更粗 (900)", value: 900 }
];
const selectedFontWeight = ref("normal");

/**
 * 更新水印颜色
 */
const updateWatermarkColor = (value: string) => {
  customConfig.font.color = value;
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

  .content-box {
    padding: 30px;
    height: 200px;
    background-color: #f9fafb;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      margin: 8px 0;
      font-size: 16px;
      color: #4b5563;
    }
  }

  .config-container {
    display: flex;
    gap: 20px;

    .config-form {
      width: 250px;
      padding: 16px;
      background-color: #f9fafb;
      border-radius: 4px;

      .form-item {
        margin-bottom: 16px;

        .label {
          display: block;
          margin-bottom: 4px;
          font-size: 14px;
          color: #4b5563;
        }

        .color-input {
          width: 30px;
          height: 30px;
          border-radius: 4px;
          border: 1px solid #e5e7eb;
        }
      }
    }

    .custom-content-box {
      flex: 1;
      padding: 30px;
      height: 300px;
      background-color: #f9fafb;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      h3 {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
        color: #1f2937;
      }

      p {
        margin: 8px 0;
        font-size: 16px;
        color: #4b5563;
      }
    }
  }

  .gap-test-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    .content-box {
      padding: 20px;
      height: 150px;
    }
  }

  .render-mode-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;

    .content-box {
      padding: 20px;
      height: 150px;
    }
  }
}
</style>
