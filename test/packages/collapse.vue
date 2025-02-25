<template>
  <div class="test-container">
    <h2>Collapse 折叠面板组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <t-collapse v-model="active1" title="默认面板" value="1">
        <div class="collapse-content">
          这是一段内容，用于展示折叠面板的基础用法。折叠面板可以用来组织和隐藏内容，点击标题可以展开或收起内容区域。
        </div>
      </t-collapse>
      <t-collapse v-model="active1" title="禁用状态" value="2" disabled>
        <div class="collapse-content">这是一段被禁用的内容，当前面板不可点击。</div>
      </t-collapse>
    </test-section>

    <!-- 自定义图标 -->
    <test-section title="自定义图标">
      <t-collapse v-model="active2" title="自定义图标" value="1" rightIcon="caret-down">
        <div class="collapse-content">
          这是一段内容，当前面板使用了自定义的展开图标。你可以通过 rightIcon 属性来自定义右侧的图标。
        </div>
      </t-collapse>
    </test-section>

    <!-- 手风琴模式 -->
    <test-section title="手风琴模式">
      <t-collapse-group v-model="activeGroup1" :accordion="true">
        <t-collapse title="面板1" value="1">
          <div class="collapse-content">
            手风琴模式下，每次只能展开一个面板。当你展开一个新的面板时，之前展开的面板会自动关闭。
          </div>
        </t-collapse>
        <t-collapse title="面板2" value="2">
          <div class="collapse-content">这是第二个面板的内容。在手风琴模式下，它会和其他面板互斥。</div>
        </t-collapse>
        <t-collapse title="面板3" value="3">
          <div class="collapse-content">这是第三个面板的内容。你可以通过 accordion 属性来控制是否启用手风琴模式。</div>
        </t-collapse>
      </t-collapse-group>
    </test-section>

    <!-- 多选模式 -->
    <test-section title="多选模式">
      <t-collapse-group v-model="activeGroup2">
        <t-collapse title="面板1" value="1">
          <div class="collapse-content">多选模式下，可以同时展开多个面板。这是默认的行为模式。</div>
        </t-collapse>
        <t-collapse title="面板2" value="2">
          <div class="collapse-content">这是第二个面板的内容。你可以同时展开多个面板查看内容。</div>
        </t-collapse>
        <t-collapse title="面板3" value="3">
          <div class="collapse-content">这是第三个面板的内容。每个面板的展开状态都是独立的。</div>
        </t-collapse>
      </t-collapse-group>
    </test-section>

    <!-- 事件测试 -->
    <test-section title="事件测试">
      <t-collapse v-model="active3" title="点击触发事件" value="1" @change="handleChange">
        <div class="collapse-content">这个面板会触发 change 事件，你可以在控制台查看事件触发的记录。</div>
      </t-collapse>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TCollapse, TCollapseGroup } from "@/packages/collapse";
import TestSection from "../components/test-section.vue";

defineOptions({ name: "CollapseTest" });

// 基础用法
const active1 = ref<string>();
const active2 = ref<string>();
const active3 = ref<string>();

// 手风琴模式
const activeGroup1 = ref<string[]>([]);

// 多选模式
const activeGroup2 = ref<string[]>(["1", "2"]);

/**
 * 处理变更事件
 */
const handleChange = (value?: any) => {
  console.log("change事件触发，当前值:", value);
};
</script>

<style lang="scss" scoped>
.test-container {
  padding: 20px;

  h2 {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 28px;
  }

  .collapse-content {
    padding: 16px;
    color: #666;
    line-height: 1.6;
  }
}
</style>
