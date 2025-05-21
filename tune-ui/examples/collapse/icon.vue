<template>
  <div class="collapse-demo">
    <h4>自定义箭头图标</h4>
    <t-collapse-group v-model="activeNames1">
      <t-collapse title="使用plus和minus图标" value="1" rightIcon="plus">
        <div class="collapse-content">通过设置 rightIcon 属性可以自定义展开/折叠的图标。这里使用了plus(加号)图标。</div>
      </t-collapse>
      <t-collapse title="使用箭头图标" value="2" rightIcon="arrow-down">
        <div class="collapse-content">这里使用了arrow-down图标作为展开/折叠的指示器。</div>
      </t-collapse>
      <t-collapse title="使用自定义图标" value="3" rightIcon="setting">
        <div class="collapse-content">还可以使用任何其他图标，如设置(setting)图标。</div>
      </t-collapse>
    </t-collapse-group>

    <h4 style="margin-top: 24px">使用插槽自定义图标</h4>
    <t-collapse-group v-model="activeNames2">
      <t-collapse title="自定义展开/折叠图标" value="1">
        <template #icon="{ isActive }">
          <t-icon :icon="isActive ? 'check-circle' : 'circle'" :style="{ color: isActive ? '#67c23a' : '#c0c4cc' }" />
        </template>
        <div class="collapse-content">
          使用icon插槽可以完全自定义展开/折叠图标的样式和行为。 这里根据面板的展开状态切换不同的图标和颜色。
        </div>
      </t-collapse>

      <t-collapse title="带动画效果的图标" value="2">
        <template #icon="{ isActive }">
          <t-icon icon="arrow-right" class="rotate-icon" :class="{ 'is-active': isActive }" />
        </template>
        <div class="collapse-content">可以添加CSS动画效果，使得图标随着展开/折叠状态变化有平滑的过渡效果。</div>
      </t-collapse>
    </t-collapse-group>

    <h4 style="margin-top: 24px">自定义标题内容</h4>
    <t-collapse-group v-model="activeNames3">
      <t-collapse value="1">
        <template #title>
          <div class="custom-title">
            <t-icon icon="info-circle" style="margin-right: 8px; color: #409eff" />
            <span>带图标的标题</span>
          </div>
        </template>
        <div class="collapse-content">使用title插槽可以完全自定义标题区域的内容和样式。</div>
      </t-collapse>

      <t-collapse value="2">
        <template #title>
          <div class="custom-title">
            <span>带徽章的标题</span>
            <span class="badge">New</span>
          </div>
        </template>
        <div class="collapse-content">可以在标题中添加徽章、标签或其他元素，增强视觉效果和信息传达。</div>
      </t-collapse>
    </t-collapse-group>
  </div>
</template>

<script setup>
import { ref } from "vue";


const activeNames1 = ref(["1"]);
const activeNames2 = ref(["1"]);
const activeNames3 = ref(["1"]);
</script>

<style scoped>
.collapse-demo {
  padding: 16px 0;
}

h4 {
  margin: 0 0 16px;
  font-size: 16px;
  color: #606266;
}

.collapse-content {
  line-height: 1.6;
  color: #606266;
}

.custom-title {
  display: flex;
  align-items: center;
}

.badge {
  display: inline-block;
  margin-left: 8px;
  padding: 2px 6px;
  font-size: 12px;
  line-height: 1;
  border-radius: 10px;
  background-color: #f56c6c;
  color: white;
}

.rotate-icon {
  transition: transform 0.3s;
}

.rotate-icon.is-active {
  transform: rotate(90deg);
}
</style>
