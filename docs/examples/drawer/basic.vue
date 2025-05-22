<template>
  <div class="drawer-demo">
    <t-button type="primary" @click="drawerVisible = true">打开抽屉</t-button>
    
    <t-drawer v-model="drawerVisible" title="基础抽屉">
      <div class="drawer-content">
        <p>这是一个基础的抽屉组件，从屏幕边缘滑出的浮层面板。</p>
        <p>抽屉组件常用于以下场景：</p>
        <ul>
          <li>侧边导航菜单</li>
          <li>详情页展示</li>
          <li>表单填写</li>
          <li>设置面板</li>
        </ul>
        <p>默认情况下，抽屉组件从左侧弹出，包含标题栏、内容区域和底部操作按钮。</p>
      </div>
    </t-drawer>
  </div>
</template>

<script setup>
import { ref } from "vue";


const drawerVisible = ref(false);
</script>

<style scoped>
.drawer-demo {
  padding: 16px 0;
}

.drawer-content {
  line-height: 1.6;
  color: #606266;
}

.drawer-content p {
  margin: 0 0 12px;
}

.drawer-content ul {
  margin: 0 0 12px;
  padding-left: 24px;
}

.drawer-content li {
  margin-bottom: 8px;
}
</style> 