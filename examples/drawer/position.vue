<template>
  <div class="drawer-demo">
    <div class="button-group">
      <t-button type="primary" @click="openDrawer('left')">左侧弹出</t-button>
      <t-button type="primary" @click="openDrawer('right')">右侧弹出</t-button>
      <t-button type="primary" @click="openDrawer('top')">顶部弹出</t-button>
      <t-button type="primary" @click="openDrawer('bottom')">底部弹出</t-button>
    </div>

    <t-drawer v-model="positionDrawerVisible" :title="positionTitle" :position="position">
      <div class="drawer-content">
        <p>
          当前抽屉从<strong>{{ positionText }}</strong
          >弹出。
        </p>
        <p>抽屉组件支持从屏幕的四个方向弹出，可以根据不同的交互场景选择合适的弹出方向：</p>
        <ul>
          <li><strong>左侧弹出</strong>：适用于导航菜单、筛选条件等场景</li>
          <li><strong>右侧弹出</strong>：适用于设置面板、详情展示等场景</li>
          <li><strong>顶部弹出</strong>：适用于通知提醒、简短信息展示等场景</li>
          <li><strong>底部弹出</strong>：适用于移动端操作面板、选择器等场景</li>
        </ul>
        <p>通过设置 <code>position</code> 属性可以控制抽屉弹出方向。</p>
      </div>
    </t-drawer>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const positionDrawerVisible = ref(false);
const position = ref("left");

const positionMap = {
  left: "左侧",
  right: "右侧",
  top: "顶部",
  bottom: "底部"
};

const positionText = computed(() => positionMap[position.value] || "左侧");
const positionTitle = computed(() => `${positionText.value}抽屉`);

/**
 * 打开指定方向的抽屉
 */
const openDrawer = pos => {
  position.value = pos;
  positionDrawerVisible.value = true;
};
</script>

<style scoped>
.drawer-demo {
  padding: 16px 0;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
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

.drawer-content strong {
  color: #409eff;
}

.drawer-content code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
  font-family: Consolas, Monaco, monospace;
}
</style>
