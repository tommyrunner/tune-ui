<template>
  <div class="test-container">
    <h2>Select 选择器组件</h2>

    <h3>基础选择器</h3>
    <test-section title="基础用法">
      <div class="select-wrapper">
        <t-select v-model="state.value" :options="options" />
        <div class="value-display">当前值：{{ state.value }}</div>
      </div>
    </test-section>

    <test-section title="选择器类型">
      <div class="select-wrapper">
        <t-select v-model="state.value" :options="options" type="input" placeholder="输入框类型" />
        <t-select v-model="state.value" :options="options" type="text" placeholder="文本类型" />
      </div>
    </test-section>

    <test-section title="尺寸">
      <div class="select-wrapper">
        <t-select v-model="state.value" :options="options" size="small" placeholder="小尺寸" />
        <t-select v-model="state.value" :options="options" size="default" placeholder="默认尺寸" />
        <t-select v-model="state.value" :options="options" size="large" placeholder="大尺寸" />
      </div>
    </test-section>

    <test-section title="禁用状态">
      <div class="select-wrapper">
        <t-select v-model="state.value" :options="options" disabled placeholder="禁用状态" />
        <t-select v-model="state.value" :options="disabledOptions" placeholder="部分选项禁用" />
      </div>
    </test-section>

    <test-section title="可清空">
      <div class="select-wrapper">
        <t-select v-model="state.clearValue" :options="options" clearable placeholder="点击清空" @clear="handleClear" />
        <div class="value-display">清空事件：{{ state.clearCount }}</div>
      </div>
    </test-section>

    <test-section title="多选模式">
      <div class="select-wrapper">
        <t-select v-model="state.multipleValue" :options="options" filterable multiple placeholder="请选择多项" />
        <div class="value-display">多选值：{{ state.multipleValue }}</div>
      </div>
    </test-section>

    <test-section title="可过滤">
      <div class="select-wrapper">
        <t-select v-model="state.filterValue" :options="options" filterable placeholder="输入过滤" />
        <t-select
          v-model="state.filterValue"
          :options="options"
          filterable
          :filter-method="handleFilterMethod"
          placeholder="自定义过滤（值+标签）"
        />
      </div>
    </test-section>

    <test-section title="远程搜索">
      <div class="select-wrapper">
        <t-select
          v-model="state.remoteValue"
          :options="remoteOptions"
          v-model:loading="state.loading"
          filterable
          :remote-method="handleRemoteMethod"
          placeholder="远程搜索"
        />
      </div>
    </test-section>

    <test-section title="自定义插槽">
      <div class="select-wrapper">
        <t-select v-model="state.value" :options="options" placeholder="前缀图标">
          <template #prefix>
            <t-icon icon="search" />
          </template>
        </t-select>

        <t-select v-model="state.value" :options="options" placeholder="自定义选项">
          <template #default="{ row }">
            <div class="custom-option">
              <t-icon icon="user" />
              <span>{{ row.label }}</span>
              <span class="option-value">({{ row.value }})</span>
            </div>
          </template>
        </t-select>

        <t-select v-model="state.multipleValue" :options="options" multiple placeholder="自定义多选视图">
          <template #multiple-view="{ model }">
            <t-tag size="small" type="info"> + {{ Array.isArray(model) ? model.length : 0 }} </t-tag>
          </template>
        </t-select>
      </div>
    </test-section>

    <test-section title="空状态">
      <div class="select-wrapper">
        <t-select v-model="state.value" :options="[]" empty-text="暂无可选项" placeholder="自定义空状态" />
      </div>
    </test-section>

    <h3>级联选择器</h3>
    <test-section title="基础级联选择">
      <div class="select-wrapper">
        <t-select v-model="state.cascaderValue" :options="cascaderOptions" placeholder="请选择" />
        <div class="value-display">选中值：{{ state.cascaderValue }}</div>
      </div>
    </test-section>

    <test-section title="级联选择尺寸">
      <div class="select-wrapper">
        <t-select v-model="state.cascaderSizeSmall" :options="cascaderOptions" size="small" placeholder="小尺寸" />
        <t-select v-model="state.cascaderSizeDefault" :options="cascaderOptions" size="default" placeholder="默认尺寸" />
        <t-select v-model="state.cascaderSizeLarge" :options="cascaderOptions" size="large" placeholder="大尺寸" />
      </div>
    </test-section>

    <test-section title="级联选择禁用">
      <div class="select-wrapper">
        <t-select v-model="state.cascaderDisabled" :options="cascaderOptions" disabled placeholder="禁用状态" />
        <t-select v-model="state.cascaderDisabledItems" :options="cascaderDisabledOptions" placeholder="部分选项禁用" />
      </div>
    </test-section>

    <test-section title="级联选择可清空">
      <div class="select-wrapper">
        <t-select
          v-model="state.cascaderClearable"
          :options="cascaderOptions"
          clearable
          placeholder="点击清空"
          @clear="handleCascaderClear"
        />
        <div class="value-display">清空事件：{{ state.cascaderClearCount }}</div>
      </div>
    </test-section>

    <test-section title="级联路径显示模式">
      <div class="select-wrapper">
        <t-select
          v-model="state.cascaderValueAll"
          :options="cascaderOptions"
          :show-all-levels="false"
          placeholder="显示完整路径"
        />
        <t-select
          v-model="state.cascaderValuePath"
          :options="cascaderOptions"
          :show-all-levels="true"
          placeholder="仅显示最后一级"
        />
        <div class="value-display">
          <div>完整路径值: {{ state.cascaderValueAll }}</div>
          <div>最后一级值: {{ state.cascaderValuePath }}</div>
        </div>
      </div>
    </test-section>

    <test-section title="级联父级节点选择控制">
      <div class="select-wrapper">
        <t-select v-model="state.cascaderParent1" :options="cascaderOptions" placeholder="严格选择模式" :check-strictly="true" />
        <t-select v-model="state.cascaderParent2" :options="cascaderOptions" placeholder="允许选父级" :check-strictly="false" />
        <div class="value-display">
          <div>严格模式值(只能选叶子): {{ state.cascaderParent1 }}</div>
          <div>自由模式值(可选父级): {{ state.cascaderParent2 }}</div>
        </div>
      </div>
    </test-section>

    <test-section title="级联选择自定义插槽">
      <div class="select-wrapper">
        <t-select v-model="state.cascaderCustomValue" :options="cascaderOptions" placeholder="自定义级联选项">
          <template #default="{ row }">
            <div class="custom-option">
              <t-icon icon="map" />
              <span>{{ row.label }}</span>
              <span class="option-value" v-if="row.subLabel">({{ row.subLabel }})</span>
            </div>
          </template>
        </t-select>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { TSelect } from "@/packages/select";
import { TTag } from "@/packages/tag";
import { TIcon } from "@/packages/icon";
import TestSection from "../components/test-section.vue";
import type { OptionsItemType } from "@/packages/select/select";

defineOptions({ name: "SelectTest" });

const item5 = {
  label: "选项五",
  value: "5"
};
// 基础选项
const options = reactive([
  { label: "选项1", value: "1" },
  { label: "选项2", value: "2" },
  { label: "选项3", value: "3" },
  { label: "选项4", value: "4" },
  { label: "选项五", value: item5 }
]);

// 带禁用选项
const disabledOptions = [
  { label: "选项1", value: "1" },
  { label: "选项2", value: "2", disabled: true },
  { label: "选项3", value: "3" },
  { label: "选项4", value: "4", disabled: true }
];

// 级联选择测试数据
const cascaderOptions = [
  {
    label: "北京",
    value: "beijing",
    subLabel: "北京市",
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

// 级联选择带禁用选项
const cascaderDisabledOptions = [
  {
    label: "北京",
    value: "beijing",
    children: [
      { label: "朝阳区", value: "chaoyang" },
      { label: "海淀区", value: "haidian", disabled: true },
      {
        label: "西城区",
        value: "xicheng",
        children: [
          { label: "德胜街道", value: "desheng" },
          { label: "展览路街道", value: "zhanlan", disabled: true }
        ]
      }
    ]
  },
  {
    label: "上海",
    value: "shanghai",
    disabled: true,
    children: [
      { label: "浦东新区", value: "pudong" },
      { label: "黄浦区", value: "huangpu" }
    ]
  },
  {
    label: "广州",
    value: "guangzhou"
  }
];

// 远程选项
const remoteOptions = ref<OptionsItemType[]>([]);

// 组件状态
const state = reactive({
  // 基础选择器状态
  value: "",
  clearValue: "",
  clearCount: 0,
  multipleValue: [] as any[],
  filterValue: "",
  remoteValue: "",
  loading: false,

  // 级联选择器状态
  cascaderValue: "",
  cascaderValueAll: "",
  cascaderValuePath: "",
  cascaderParent1: "",
  cascaderParent2: "",
  cascaderSizeSmall: "",
  cascaderSizeDefault: "",
  cascaderSizeLarge: "",
  cascaderDisabled: "",
  cascaderDisabledItems: "",
  cascaderClearable: "",
  cascaderClearCount: 0,
  cascaderFilterValue: "",
  cascaderFilterCustomValue: "",
  cascaderCustomValue: ""
});

/**
 * 处理清空事件
 */
const handleClear = () => {
  state.clearCount++;
};

/**
 * 处理级联清空事件
 */
const handleCascaderClear = () => {
  state.cascaderClearCount++;
};

/**
 * 自定义过滤方法
 * @param option 选项
 * @param query 查询文本
 */
const handleFilterMethod = (option: OptionsItemType, query: string) => {
  const text = query.toLowerCase();
  return option.label.toLowerCase().includes(text) || String(option.value).toLowerCase().includes(text);
};

/**
 * 远程搜索方法
 * @param query 查询文本
 */
const handleRemoteMethod = async (query: string) => {
  state.loading = true;
  // 模拟远程请求
  setTimeout(() => {
    state.loading = false;
    remoteOptions.value = options.filter(item => item.label.toLowerCase().includes(query.toLowerCase()));
  }, 2000);
};
</script>

<style lang="scss" scoped>
.test-container {
  padding: 24px;

  h2 {
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 28px;
    color: #1f2937;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 12px;
  }

  .select-wrapper {
    display: flex;
    gap: 16px;
    align-items: center;

    .value-display {
      padding: 8px 12px;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      color: #4b5563;
      font-size: 14px;
    }

    .custom-option {
      display: flex;
      align-items: center;
      gap: 8px;

      .option-value {
        color: #9ca3af;
        font-size: 12px;
      }
    }
  }
}
</style>
