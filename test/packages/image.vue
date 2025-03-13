<template>
  <div class="test-container">
    <h2>Image 图片组件</h2>

    <!-- 基础属性 -->
    <test-section title="基础属性">
      <t-image :src="testImages.basic" alt="测试图片" width="200px" height="200px" referrerPolicy="no-referrer" />
    </test-section>

    <!-- 适应容器方式 -->
    <test-section title="适应容器方式">
      <div class="fit-container">
        <div v-for="fit in fitTypes" :key="fit" class="fit-item">
          <span class="fit-title">{{ fit }}</span>
          <t-image :src="testImages.fit" :fit="fit" width="200px" height="200px" />
        </div>
      </div>
    </test-section>

    <!-- 加载状态 -->
    <test-section title="加载状态">
      <div class="state-container">
        <div class="state-item">
          <div class="state-title">加载中</div>
          <t-image :src="testImages.loading" width="200px" height="200px">
            <template #placeholder>
              <div class="image-slot">
                <t-icon icon="loading" class="t-loading" />
                <span>加载中...</span>
              </div>
            </template>
          </t-image>
        </div>
        <div class="state-item">
          <div class="state-title">加载失败</div>
          <t-image :src="testImages.error" width="200px" height="200px">
            <template #error>
              <div class="image-slot">
                <t-icon icon="image" />
                <span>加载失败</span>
              </div>
            </template>
          </t-image>
        </div>
      </div>
    </test-section>

    <!-- 懒加载 -->
    <test-section title="懒加载">
      <div class="lazy-container">
        <t-image v-for="(url, index) in testImages.lazy" :key="index" :src="url" lazy width="200px" height="200px" />
      </div>
    </test-section>

    <!-- 图片预览基础 -->
    <test-section title="图片预览基础">
      <div class="preview-container">
        <t-image
          ref="previewImageRef"
          :src="testImages.preview[0]"
          width="200px"
          height="200px"
          :preview-src-list="testImages.preview"
          :initial-index="0"
          :close-on-press-escape="true"
          :z-index="2000"
          :infinite="true"
          @show="handleShow"
          @close="handleClose"
        />
        <t-button @click="handlePreviewClick">点击预览</t-button>
      </div>
    </test-section>

    <!-- 预览缩放 -->
    <test-section title="预览缩放">
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
        @show="handleShow"
      />
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TImage } from "@/packages/image";
import { TIcon } from "@/packages/icon";
import { TButton } from "@/packages/button";
import TestSection from "../components/test-section.vue";
import type { ImageFit } from "@/packages/image/image";

defineOptions({ name: "ImageTest" });

// 图片预览ref
const previewImageRef = ref();

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

/**
 * 处理预览显示
 */
const handleShow = () => {
  console.log("显示预览");
};

/**
 * 处理预览按钮点击
 */
const handlePreviewClick = () => {
  previewImageRef.value?.showPreview();
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

  .fit-container,
  .state-container {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;

    .fit-item,
    .state-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;

      .fit-title,
      .state-title {
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

  .preview-container {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}
</style>
