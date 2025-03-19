<template>
  <div
    class="t-upload-dragger"
    :class="{ 'is-dragover': dragover, 'is-disabled': draggerContext.disabled }"
    @drop.prevent="handleDrop"
    @dragover.prevent="dragover = true"
    @dragleave.prevent="dragover = false"
    @click="handleClick"
  >
    <!-- 自定义内容 -->
    <slot>
      <div class="t-upload-dragger__default">
        <t-icon icon="upload-to" :size="28" style="margin-right: 4px; vertical-align: middle" />
        <div class="t-upload-dragger__text">
          <p>将文件拖到此处，或<em>点击上传</em></p>
          <p class="t-upload-dragger__tip">
            支持{{ draggerContext.accept ? draggerContext.accept.replace(/,/g, ", ") : "任意类型" }}文件
          </p>
        </div>
      </div>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject } from "vue";
import { TIcon } from "@/packages/icon";
import { uploadDraggerKey } from "../../constants";
import type { UploadDraggerContextType } from "../../upload";

defineOptions({
  name: "TUploadDragger"
});

const emit = defineEmits(["drag-click"]);

// 注入上下文
const draggerContext = inject<UploadDraggerContextType>(uploadDraggerKey, {
  disabled: false,
  handleDrop: () => {}
});

const dragover = ref(false);

const handleDrop = (e: DragEvent) => {
  if (e.dataTransfer && !draggerContext.disabled) {
    dragover.value = false;
    draggerContext.handleDrop(e.dataTransfer.files);
  }
};

const handleClick = () => {
  emit("drag-click");
};
</script>

<style lang="scss" scoped>
@import "./upload-dragger.scss";
</style>
