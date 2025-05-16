<template>
  <div class="drawer-demo">
    <div class="options-panel">
      <h3>交互配置选项</h3>
      
      <div class="option-item">
        <t-checkbox v-model="showModal">显示遮罩层</t-checkbox>
        <div class="option-desc">控制抽屉背景是否显示遮罩层</div>
      </div>
      
      <div class="option-item">
        <t-checkbox v-model="closeOnPressModel">点击遮罩层关闭</t-checkbox>
        <div class="option-desc">控制点击遮罩层是否可以关闭抽屉</div>
      </div>
      
      <div class="option-item">
        <t-checkbox v-model="closeOnPressEscape">按ESC关闭</t-checkbox>
        <div class="option-desc">控制按ESC键是否可以关闭抽屉</div>
      </div>
      
      <div class="option-item">
        <t-checkbox v-model="setMaxHeight">设置最大高度</t-checkbox>
        <div class="option-desc">控制是否限制抽屉的最大高度(适用于左右方向)</div>
      </div>
      
      <t-button type="primary" @click="openDrawer">打开抽屉</t-button>
    </div>

    <t-drawer
      v-model="drawerVisible"
      title="交互配置"
      :is-modal="showModal"
      :close-on-press-model="closeOnPressModel"
      :close-on-press-escape="closeOnPressEscape"
      :is-set-max-height="setMaxHeight"
    >
      <div class="drawer-content">
        <p>当前交互配置：</p>
        <div class="current-settings">
          <ul>
            <li>
              <span class="setting-name">显示遮罩层：</span>
              <span class="setting-value" :class="{ 'enabled': showModal }">{{ showModal ? '是' : '否' }}</span>
            </li>
            <li>
              <span class="setting-name">点击遮罩层关闭：</span>
              <span class="setting-value" :class="{ 'enabled': closeOnPressModel }">{{ closeOnPressModel ? '是' : '否' }}</span>
            </li>
            <li>
              <span class="setting-name">按ESC关闭：</span>
              <span class="setting-value" :class="{ 'enabled': closeOnPressEscape }">{{ closeOnPressEscape ? '是' : '否' }}</span>
            </li>
            <li>
              <span class="setting-name">设置最大高度：</span>
              <span class="setting-value" :class="{ 'enabled': setMaxHeight }">{{ setMaxHeight ? '是' : '否' }}</span>
            </li>
          </ul>
        </div>
        <p>通过这些配置选项，可以灵活控制抽屉的交互行为，适应不同的使用场景。</p>
        <p class="tip">尝试根据当前配置与抽屉进行交互。</p>
      </div>
    </t-drawer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TDrawer, TButton, TCheckbox } from "tune-ui";

const drawerVisible = ref(false);
const showModal = ref(true);
const closeOnPressModel = ref(true);
const closeOnPressEscape = ref(true);
const setMaxHeight = ref(true);

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

.options-panel h3 {
  margin: 0 0 16px;
  font-size: 16px;
  color: #409eff;
}

.option-item {
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px dashed #e4e7ed;
}

.option-desc {
  margin-top: 4px;
  margin-left: 24px;
  font-size: 12px;
  color: #909399;
}

.drawer-content {
  line-height: 1.6;
  color: #606266;
}

.drawer-content p {
  margin: 0 0 12px;
}

.current-settings {
  background-color: #f5f7fa;
  border-radius: 4px;
  padding: 12px 16px;
  margin: 12px 0;
}

.current-settings ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.current-settings li {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.setting-name {
  flex: 1;
  color: #606266;
}

.setting-value {
  padding: 2px 8px;
  border-radius: 3px;
  background-color: #f5f5f5;
  color: #909399;
}

.setting-value.enabled {
  background-color: #ecf5ff;
  color: #409eff;
}

.tip {
  margin-top: 16px;
  padding: 8px 12px;
  background-color: #fff6e8;
  border-left: 3px solid #e6a23c;
  color: #c28135;
}
</style> 