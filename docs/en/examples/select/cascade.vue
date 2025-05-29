<template>
  <div class="demo-select">
    <div class="cascade-basic">
      <p class="cascade-label">Basic Cascade Selection</p>
      <t-select v-model="value" :options="cascadeOptions" placeholder="Please select region" />
      <div class="value-display">Current value: {{ value }}</div>
    </div>

    <div class="cascade-display">
      <p class="cascade-label">Path Display Mode</p>
      <div class="cascade-row">
        <div class="cascade-item">
          <p class="cascade-sublabel">Show Full Path</p>
          <t-select v-model="pathValue" :options="cascadeOptions" :show-all-levels="true" placeholder="Show full path" />
        </div>

        <div class="cascade-item">
          <p class="cascade-sublabel">Show Last Level Only</p>
          <t-select
            v-model="lastLevelValue"
            :options="cascadeOptions"
            :show-all-levels="false"
            placeholder="Show last level only"
          />
        </div>
      </div>
    </div>

    <div class="cascade-selection">
      <p class="cascade-label">Selection Mode Control</p>
      <div class="cascade-row">
        <div class="cascade-item">
          <p class="cascade-sublabel">Strict Mode</p>
          <t-select
            v-model="strictValue"
            :options="cascadeOptions"
            :check-strictly="true"
            placeholder="Only leaf nodes selectable"
          />
        </div>

        <div class="cascade-item">
          <p class="cascade-sublabel">Free Mode</p>
          <t-select
            v-model="freeValue"
            :options="cascadeOptions"
            :check-strictly="false"
            :select-parent="true"
            placeholder="Parent nodes selectable"
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

// Cascade options data
const cascadeOptions = [
  {
    label: "Beijing",
    value: "beijing",
    children: [
      { label: "Chaoyang District", value: "chaoyang" },
      { label: "Haidian District", value: "haidian" },
      {
        label: "Xicheng District",
        value: "xicheng",
        children: [
          { label: "Desheng Street", value: "desheng" },
          { label: "Zhanlan Street", value: "zhanlan" }
        ]
      }
    ]
  },
  {
    label: "Shanghai",
    value: "shanghai",
    children: [
      { label: "Pudong New Area", value: "pudong" },
      { label: "Huangpu District", value: "huangpu" }
    ]
  },
  {
    label: "Guangzhou",
    value: "guangzhou"
  },
  {
    label: "Shenzhen",
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
