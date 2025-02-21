<template>
  <div class="test-container">
    <h2>Select 选择器组件</h2>

    <!-- 基础选择器 -->
    <test-section title="基础选择器">
      <div class="select-wrapper">
        <t-select v-model="state.basicValue" :options="basicOptions" placeholder="请选择" />
        <div class="value-display">选中值: {{ state.basicValue }}</div>
      </div>
    </test-section>

    <!-- 不同尺寸 -->
    <test-section title="不同尺寸">
      <div class="select-wrapper">
        <t-select v-model="state.sizeValue" size="small" :options="basicOptions" placeholder="小尺寸" />
        <t-select v-model="state.sizeValue" :options="basicOptions" placeholder="默认尺寸" />
        <t-select v-model="state.sizeValue" size="large" :options="basicOptions" placeholder="大尺寸" />
      </div>
    </test-section>

    <!-- 文本模式 -->
    <test-section title="文本模式">
      <div class="select-wrapper">
        <t-select v-model="state.textValue" type="text" :options="basicOptions" />
      </div>
    </test-section>

    <!-- 禁用状态 -->
    <test-section title="禁用状态">
      <div class="select-wrapper">
        <t-select v-model="state.disabledValue" :options="basicOptions" disabled placeholder="禁用状态" />
      </div>
    </test-section>

    <!-- 可清空 -->
    <test-section title="可清空">
      <div class="select-wrapper">
        <t-select v-model="state.clearValue" :options="basicOptions" clearable placeholder="可清空" @clear="handleClear" />
      </div>
    </test-section>

    <!-- 前缀图标 -->
    <test-section title="前缀图标">
      <div class="select-wrapper">
        <t-select v-model="state.prefixValue" :options="basicOptions" placeholder="带图标">
          <template #prefix>
            <t-icon icon="search" />
          </template>
        </t-select>
      </div>
    </test-section>

    <!-- 提示信息 -->
    <test-section title="提示信息">
      <div class="select-wrapper">
        <t-select
          v-model="state.tipValue"
          :options="basicOptions"
          :rules="[{ required: true, message: '请选择一个选项' }]"
          placeholder="必选项"
        />
        <t-select v-model="state.tipValue" :options="basicOptions" placeholder="测试" filterable empty-text="暂无数据2">
          <template #default="{ row }: SelectSlotParamsType<OptionsItemType>">
            <div class="custom-slot">
              <span>{{ row.label }}</span>
              <span class="sub-label">{{ row.value }}</span>
            </div>
          </template>
        </t-select>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { TSelect } from "@/packages/select";
import { TIcon } from "@/packages/icon";
import TestSection from "../components/test-section.vue";
import type { OptionsItemType, SelectSlotParamsType } from "@/packages/select/select";

defineOptions({ name: "SelectTest" });
const item5 = { name: "选项5" };

// 基础选项数据
const basicOptions = reactive<OptionsItemType[]>([
  { label: "选项1", value: "1" },
  { label: "选项2", value: "2" },
  { label: "选项3", value: "3" },
  { label: "选项4", value: "4" },
  { label: "选项4-4(禁用)", value: "4-4", disabled: true },
  { label: "选项5", value: "5" }
]);

// 组件状态
const state = reactive({
  basicValue: "",
  sizeValue: "",
  textValue: "",
  disabledValue: "",
  clearValue: "",
  prefixValue: "",
  tipValue: ""
});

/**
 * 处理清空事件
 */
const handleClear = () => {
  console.log("已清空选择");
};
</script>

<style lang="scss" scoped>
.test-container {
  padding: 32px;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;

  h2 {
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 28px;
    color: #1f2937;
  }

  .select-wrapper {
    display: flex;
    gap: 16px;
    align-items: center;

    .value-display {
      padding: 8px 12px;
      background-color: #f8fafc;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      color: #4b5563;
      font-size: 14px;
    }
  }
}
.custom-slot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  font-size: 12px;
  .sub-label {
    font-size: 10px;
    color: #9ca3af;
  }
}
</style>
