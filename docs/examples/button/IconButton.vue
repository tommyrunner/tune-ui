<template>
  <div class="button-demo">
    <t-button type="primary" icon="edit">编辑</t-button>
    <t-button type="primary" icon="share">分享</t-button>
    <t-button type="primary" icon="delete">删除</t-button>
    <t-button type="primary" icon="search">搜索</t-button>
    <t-button type="primary">上传<t-icon icon="upload-fill" /></t-button>
  </div>
</template>

<script setup>
import { TButton, TIcon } from "tune-ui";
</script>

<style scoped>
.button-demo {
  padding: 16px 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
