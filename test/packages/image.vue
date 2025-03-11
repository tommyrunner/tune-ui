<template>
  <div class="test-container">
    <h2>Image 图片组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <template #description>
        基础的图片用法
        <div class="params">属性：src / width / height</div>
      </template>
      <t-image :src="testImages.basic" width="200px" height="200px" />
    </test-section>

    <!-- 适应容器方式 -->
    <test-section title="适应容器方式">
      <template #description>
        <div class="params">属性：fit</div>
        <div class="params">可选值：fill / contain / cover / none / scale-down</div>
      </template>
      <div class="fit-container">
        <div v-for="fit in fitTypes" :key="fit" class="fit-item">
          <span class="fit-title">fit: {{ fit }}</span>
          <t-image :fit="fit" :src="testImages.fit" width="200px" height="200px">
            <template #error>
              <div>{{ fit }}</div>
            </template>
          </t-image>
        </div>
      </div>
    </test-section>

    <!-- 加载中占位 -->
    <test-section title="加载中占位">
      <template #description>
        <div class="params">插槽：#placeholder</div>
      </template>
      <t-image :src="testImages.loading" width="200px" height="200px">
        <template #placeholder>
          <div class="image-slot">
            <t-icon icon="loading" class="t-loading" />
            <span>加载中...</span>
          </div>
        </template>
      </t-image>
    </test-section>

    <!-- 加载失败 -->
    <test-section title="加载失败">
      <template #description>
        <div class="params">插槽：#error</div>
      </template>
      <t-image :src="testImages.error" width="200px" height="200px">
        <template #error>
          <div class="image-slot">
            <t-icon icon="image" />
            <span>加载失败</span>
          </div>
        </template>
      </t-image>
    </test-section>

    <!-- 懒加载 -->
    <test-section title="懒加载">
      <template #description>
        <div class="params">属性：lazy</div>
      </template>
      <div class="lazy-container">
        <t-image v-for="(url, index) in testImages.lazy" :key="index" :src="url" lazy width="200px" height="200px" />
      </div>
    </test-section>

    <!-- 图片预览 -->
    <test-section title="图片预览">
      <template #description>
        <div class="params">属性：preview-src-list / initial-index</div>
      </template>
      <t-image
        :src="testImages.preview[0]"
        width="200px"
        height="200px"
        :preview-src-list="testImages.preview"
        :initial-index="0"
      />
    </test-section>

    <!-- 自定义预览操作 -->
    <test-section title="自定义预览操作">
      <template #description>
        <div class="params">
          属性：<br />
          zoom-rate：缩放比例<br />
          min-scale：最小缩放<br />
          max-scale：最大缩放<br />
          initial-index：初始索引
        </div>
        <div class="params">
          事件：<br />
          @load：加载成功<br />
          @error：加载失败<br />
          @switch：切换图片<br />
          @close：关闭预览
        </div>
      </template>
      <t-image
        :src="testImages.preview[1]"
        width="200px"
        height="200px"
        :preview-src-list="testImages.preview"
        :zoom-rate="1.5"
        :min-scale="0.1"
        :max-scale="10"
        :initial-index="0"
        @load="handleLoad"
        @error="handleError"
        @switch="handleSwitch"
        @close="handleClose"
      />
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { TImage } from "@/packages/image";
import { TIcon } from "@/packages/icon";
import TestSection from "../components/test-section.vue";
import type { ImageFit } from "@/packages/image/image";

defineOptions({ name: "ImageTest" });

// 图片适应类型
const fitTypes: ImageFit[] = ["fill", "contain", "cover", "none", "scale-down"];

// 测试图片链接
const testImages = {
  basic: "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
  fit: "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
  loading: "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
  error: "error-image.jpg",
  lazy: [
    "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
    "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg"
  ],
  preview: [
    "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
    "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
    "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg"
  ]
};

/**
 * 处理图片加载成功
 */
const handleLoad = (e: Event) => {
  console.log("图片加载成功:", e);
};

/**
 * 处理图片加载失败
 */
const handleError = (e: Event) => {
  console.log("图片加载失败:", e);
};

/**
 * 处理预览图片切换
 */
const handleSwitch = (index: number) => {
  console.log("切换到图片:", index);
};

/**
 * 处理预览关闭
 */
const handleClose = () => {
  console.log("预览关闭");
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

  :deep(.test-section) {
    .test-section-content {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
    }

    code {
      background-color: #f3f4f6;
      padding: 2px 4px;
      border-radius: 4px;
      color: #e11d48;
      font-family: monospace;
    }

    .params {
      margin-top: 8px;
      color: #666;
      font-size: 14px;
      font-family: monospace;
      line-height: 1.5;
    }
  }

  .fit-container {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;

    .fit-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;

      .fit-title {
        font-size: 14px;
        color: #666;
      }
    }
  }

  .lazy-container {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    max-height: 300px;
    overflow-y: auto;
    padding: 12px;
    background-color: #f8f9fa;
    border-radius: 4px;
  }

  .image-slot {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #f5f7fa;
    color: #909399;

    .t-icon {
      font-size: 24px;
      margin-bottom: 8px;
    }

    span {
      font-size: 14px;
    }
  }
}
</style>
