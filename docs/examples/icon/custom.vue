<template>
  <div class="icon-demo">
    <div class="custom-section">
      <div class="note">通过设置<code>customIcon</code>属性可以使用自定义图标</div>

      <div class="example">
        <t-icon customIcon="custom-icon" :size="32" />
        <span class="comment">自定义图标示例</span>
      </div>

      <div class="code-block">
        <pre>&lt;t-icon customIcon="custom-icon" /&gt;</pre>
      </div>

      <div class="tip"><strong>注意：</strong>使用自定义图标需要先在项目中引入相应的图标字体文件</div>
    </div>
  </div>
</template>

<script setup>
import { TIcon } from "tune-ui";
</script>

<style scoped>
.icon-demo {
  padding: 16px 0;
}

.custom-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.note {
  padding: 12px 16px;
  background-color: #f9f9f9;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.5;
}

.note code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  font-family: monospace;
}

.example {
  display: flex;
  align-items: center;
  gap: 16px;
}

.comment {
  font-size: 14px;
  color: #666;
}

.code-block {
  margin: 8px 0;
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-radius: 6px;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  font-family: monospace;
  font-size: 14px;
}

.tip {
  padding: 8px 12px;
  border-left: 3px solid #faad14;
  background-color: #fffbe6;
  font-size: 13px;
  line-height: 1.5;
}
</style>
