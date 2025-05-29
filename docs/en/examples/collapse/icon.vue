<template>
  <div class="collapse-demo">
    <h4>Custom Arrow Icons</h4>
    <t-collapse-group v-model="activeNames1">
      <t-collapse title="Using plus and minus icons" value="1" rightIcon="plus">
        <div class="collapse-content">
          You can customize the expand/collapse icon by setting the rightIcon attribute. Here we use the plus icon.
        </div>
      </t-collapse>
      <t-collapse title="Using arrow icons" value="2" rightIcon="arrow-down">
        <div class="collapse-content">Here we use the arrow-down icon as the expand/collapse indicator.</div>
      </t-collapse>
      <t-collapse title="Using custom icons" value="3" rightIcon="setting">
        <div class="collapse-content">You can also use any other icons, such as the setting icon.</div>
      </t-collapse>
    </t-collapse-group>

    <h4 style="margin-top: 24px">Using Slots to Customize Icons</h4>
    <t-collapse-group v-model="activeNames2">
      <t-collapse title="Custom expand/collapse icon" value="1">
        <template #icon="{ isActive }">
          <t-icon :icon="isActive ? 'check-circle' : 'circle'" :style="{ color: isActive ? '#67c23a' : '#c0c4cc' }" />
        </template>
        <div class="collapse-content">
          Using the icon slot allows you to completely customize the style and behavior of expand/collapse icons. Here we switch
          different icons and colors based on the panel's expanded state.
        </div>
      </t-collapse>

      <t-collapse title="Icon with animation effects" value="2">
        <template #icon="{ isActive }">
          <t-icon icon="arrow-right" class="rotate-icon" :class="{ 'is-active': isActive }" />
        </template>
        <div class="collapse-content">
          You can add CSS animation effects to make the icon have smooth transition effects as the expand/collapse state changes.
        </div>
      </t-collapse>
    </t-collapse-group>

    <h4 style="margin-top: 24px">Custom Title Content</h4>
    <t-collapse-group v-model="activeNames3">
      <t-collapse value="1">
        <template #title>
          <div class="custom-title">
            <t-icon icon="info-circle" style="margin-right: 8px; color: #409eff" />
            <span>Title with Icon</span>
          </div>
        </template>
        <div class="collapse-content">Using the title slot allows you to completely customize the content and style of the title area.</div>
      </t-collapse>

      <t-collapse value="2">
        <template #title>
          <div class="custom-title">
            <span>Title with Badge</span>
            <span class="badge">New</span>
          </div>
        </template>
        <div class="collapse-content">
          You can add badges, tags or other elements to the title to enhance visual effects and information communication.
        </div>
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
