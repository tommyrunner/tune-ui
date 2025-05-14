<template>
  <div class="checkbox-demo">
    <div class="checkbox-item">
      <div class="style-label">默认半选图标：</div>
      <t-checkbox v-model="checked1" indeterminate>半选状态</t-checkbox>
    </div>
    <div class="checkbox-item">
      <div class="style-label">自定义半选图标：</div>
      <t-checkbox v-model="checked2" indeterminate indeterminateIcon="remove">自定义半选图标</t-checkbox>
    </div>
    <div class="checkbox-item">
      <div class="style-label">实际应用示例：</div>
      <t-checkbox :indeterminate="indeterminate" v-model="checkAll" @change="handleCheckAllChange"> 全选 </t-checkbox>
      <div class="sub-item">
        <t-checkbox v-model="checkedItems" value="A" @change="handleCheckedChange">选项A</t-checkbox>
        <t-checkbox v-model="checkedItems" value="B" @change="handleCheckedChange">选项B</t-checkbox>
        <t-checkbox v-model="checkedItems" value="C" @change="handleCheckedChange">选项C</t-checkbox>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { TCheckbox } from "tune-ui";

const checked1 = ref(true);
const checked2 = ref(true);

// 全选示例
const checkAll = ref(false);
const checkedItems = ref([]);
const options = ["A", "B", "C"];

// 计算半选状态
const indeterminate = computed(() => {
  return checkedItems.value.length > 0 && checkedItems.value.length < options.length;
});

// 处理全选变化
const handleCheckAllChange = val => {
  checkedItems.value = val ? [...options] : [];
};

// 处理选项变化
const handleCheckedChange = () => {
  checkAll.value = checkedItems.value.length === options.length;
};
</script>

<style scoped>
.checkbox-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.checkbox-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.style-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 4px;
}

.sub-item {
  margin-left: 24px;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
