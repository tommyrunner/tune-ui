<template>
  <div class="demo-select">
    <div class="cascade-basic">
      <p class="cascade-label">基础级联选择</p>
      <t-select v-model="value" :options="cascadeOptions" placeholder="请选择地区" />
      <div class="value-display">当前值: {{ value }}</div>
    </div>

    <div class="cascade-display">
      <p class="cascade-label">路径显示模式</p>
      <div class="cascade-row">
        <div class="cascade-item">
          <p class="cascade-sublabel">显示完整路径</p>
          <t-select v-model="pathValue" :options="cascadeOptions" :show-all-levels="true" placeholder="显示完整路径" />
        </div>

        <div class="cascade-item">
          <p class="cascade-sublabel">仅显示最后一级</p>
          <t-select v-model="lastLevelValue" :options="cascadeOptions" :show-all-levels="false" placeholder="仅显示最后一级" />
        </div>
      </div>
    </div>

    <div class="cascade-selection">
      <p class="cascade-label">选择模式控制</p>
      <div class="cascade-row">
        <div class="cascade-item">
          <p class="cascade-sublabel">严格模式</p>
          <t-select v-model="strictValue" :options="cascadeOptions" :check-strictly="true" placeholder="只能选叶子节点" />
        </div>

        <div class="cascade-item">
          <p class="cascade-sublabel">自由模式</p>
          <t-select
            v-model="freeValue"
            :options="cascadeOptions"
            :check-strictly="false"
            :select-parent="true"
            placeholder="可选父级节点"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref("");
const pathValue = ref("");
const lastLevelValue = ref("");
const strictValue = ref("");
const freeValue = ref("");

// 级联选项数据
const cascadeOptions = [
  {
    label: "北京",
    value: "beijing",
    children: [
      { label: "朝阳区", value: "chaoyang" },
      { label: "海淀区", value: "haidian" },
      {
        label: "西城区",
        value: "xicheng",
        children: [
          { label: "德胜街道", value: "desheng" },
          { label: "展览路街道", value: "zhanlan" }
        ]
      }
    ]
  },
  {
    label: "上海",
    value: "shanghai",
    children: [
      { label: "浦东新区", value: "pudong" },
      { label: "黄浦区", value: "huangpu" }
    ]
  },
  {
    label: "广州",
    value: "guangzhou"
  },
  {
    label: "深圳",
    value: "shenzhen"
  }
];
</script>

<style scoped>
.demo-select {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cascade-basic,
.cascade-display,
.cascade-selection {
  margin-bottom: 16px;
}

.cascade-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.cascade-item {
  min-width: 220px;
}

.cascade-label {
  font-size: 15px;
  color: #374151;
  margin-bottom: 10px;
  font-weight: 500;
}

.cascade-sublabel {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
}

.value-display {
  margin-top: 8px;
  padding: 8px 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  color: #4b5563;
  font-size: 14px;
}
</style>
