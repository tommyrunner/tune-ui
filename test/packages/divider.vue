<template>
  <div class="test-container">
    <h2>Divider 分割线</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <div>
        <span>床前明月光，疑是地上霜。</span>
        <t-divider />
        <span>举头望明月，低头思故乡。</span>
      </div>
    </test-section>

    <!-- 设置文案 -->
    <test-section title="设置文案">
      <div>
        <span>行路难，行路难，多歧路，今安在？</span>
        <t-divider content-position="left">李白</t-divider>
        <span>长风破浪会有时，直挂云帆济沧海。</span>
        <t-divider>
          <t-icon icon="preview" />
        </t-divider>
        <span>人生得意须尽欢，莫使金樽空对月。</span>
        <t-divider content-position="right">李白</t-divider>
      </div>
    </test-section>

    <!-- 不同样式 -->
    <test-section title="虚线">
      <div>
        <span>黄河远上白云间，一片孤城万仞山。</span>
        <t-divider border-style="dashed" />
        <span>羌笛何须怨杨柳，春风不度玉门关。</span>
        <t-divider border-style="dotted" />
        <span>渭城朝雨浥轻尘，客舍青青柳色新。</span>
        <t-divider border-style="double" />
        <span>劝君更尽一杯酒，西出阳关无故人。</span>
      </div>
    </test-section>

    <!-- 垂直分隔线 -->
    <test-section title="垂直分隔线">
      <div style="height: 50px; display: flex; align-items: center">
        <span>山</span>
        <t-divider direction="vertical" />
        <span>水</span>
        <t-divider direction="vertical" border-style="dashed" />
        <span>诗</span>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { TDivider } from "@/packages/divider";
import { TIcon } from "@/packages/icon";
import TestSection from "../components/test-section.vue";

defineOptions({ name: "DividerTest" });
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
      flex-direction: column;
      gap: 12px;
    }
  }
}
</style>
