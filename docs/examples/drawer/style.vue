<template>
  <div class="drawer-demo">
    <div class="options-panel">
      <div class="option-group">
        <h4>尺寸设置</h4>
        <div class="option-buttons">
          <t-button size="small" @click="updateSize('300px')">窄</t-button>
          <t-button size="small" @click="updateSize('500px')">中</t-button>
          <t-button size="small" @click="updateSize('800px')">宽</t-button>
        </div>
      </div>
      
      <div class="option-group">
        <h4>内边距</h4>
        <div class="option-buttons">
          <t-button size="small" @click="updatePadding([8, 8, 8, 8])">小</t-button>
          <t-button size="small" @click="updatePadding([16, 16, 16, 16])">中</t-button>
          <t-button size="small" @click="updatePadding([24, 24, 24, 24])">大</t-button>
        </div>
      </div>
      
      <div class="option-group">
        <h4>偏移设置</h4>
        <div class="option-buttons">
          <t-button size="small" @click="updateOffset({ x: 0, y: 0 })">无偏移</t-button>
          <t-button size="small" @click="updateOffset({ x: 20, y: 20 })">中等偏移</t-button>
          <t-button size="small" @click="updateOffset({ x: 40, y: 40 })">大偏移</t-button>
        </div>
      </div>
      
      <t-button type="primary" class="apply-button" @click="openDrawer">应用并打开抽屉</t-button>
    </div>
    
    <t-drawer
      v-model="drawerVisible"
      title="自定义样式抽屉"
      :size="settings.size"
      :padding="settings.padding"
      :offset="settings.offset"
      :box-shadow="settings.boxShadow"
    >
      <div class="drawer-content">
        <p>抽屉组件提供了多种样式配置选项：</p>
        <div class="settings-info">
          <h3>当前设置</h3>
          <ul>
            <li><strong>尺寸：</strong>{{ settings.size }}</li>
            <li><strong>内边距：</strong>[{{ settings.padding.join(', ') }}]</li>
            <li><strong>偏移：</strong>x={{ settings.offset.x }}, y={{ settings.offset.y }}</li>
            <li><strong>阴影：</strong>[{{ settings.boxShadow.join(', ') }}]</li>
          </ul>
        </div>
        <p>通过这些属性，可以根据不同的业务需求自定义抽屉的外观和尺寸。</p>
      </div>
    </t-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { TDrawer, TButton } from "tune-ui";

const drawerVisible = ref(false);

const settings = reactive({
  size: "500px",
  padding: [16, 16, 16, 16],
  offset: { x: 0, y: 0 },
  boxShadow: [0, 4, 12, "rgba(0, 0, 0, 0.1)"]
});

/**
 * 更新尺寸设置
 */
const updateSize = (size) => {
  settings.size = size;
};

/**
 * 更新内边距设置
 */
const updatePadding = (padding) => {
  settings.padding = padding;
};

/**
 * 更新偏移设置
 */
const updateOffset = (offset) => {
  settings.offset = offset;
};

/**
 * 打开抽屉
 */
const openDrawer = () => {
  drawerVisible.value = true;
};
</script>

<style scoped>
.drawer-demo {
  padding: 16px 0;
}

.options-panel {
  background-color: #f5f7fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.option-group {
  margin-bottom: 16px;
}

.option-group h4 {
  margin: 0 0 8px;
  font-size: 14px;
  color: #606266;
}

.option-buttons {
  display: flex;
  gap: 8px;
}

.apply-button {
  margin-top: 16px;
}

.drawer-content {
  line-height: 1.6;
  color: #606266;
}

.drawer-content p {
  margin: 0 0 12px;
}

.settings-info {
  background-color: #ecf5ff;
  border-radius: 4px;
  padding: 12px 16px;
  margin: 12px 0;
}

.settings-info h3 {
  margin: 0 0 8px;
  font-size: 16px;
  color: #409eff;
}

.settings-info ul {
  margin: 0;
  padding-left: 20px;
}

.settings-info li {
  margin-bottom: 4px;
}

.settings-info strong {
  font-weight: 500;
  color: #303133;
}
</style> 