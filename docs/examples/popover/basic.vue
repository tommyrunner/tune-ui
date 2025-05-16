<template>
  <div class="demo-container">
    <p class="demo-desc">弹出框组件支持hover和click两种触发方式，可以根据实际需求选择合适的交互方式。</p>

    <div class="demo-block">
      <t-popover content="这是一个基础弹出框，通过hover触发">
        <t-button type="primary">hover触发</t-button>
      </t-popover>

      <t-popover content="这是一个点击触发的弹出框" type="click">
        <t-button type="success">click触发</t-button>
      </t-popover>

      <t-popover content="禁用状态下不会触发弹出框" disabled>
        <t-button type="info">禁用状态</t-button>
      </t-popover>
    </div>
  </div>
</template>

<script setup>
import { TPopover, TButton } from "tune-ui";
</script>

<style scoped>
.demo-container {
  padding: 16px 0;
}

.demo-desc {
  margin: 0 0 16px;
  color: #606266;
  line-height: 1.6;
}

.demo-block {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
