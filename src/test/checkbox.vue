<template>
  <div class="test-container">
    <h2>Checkbox 复选框组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <div class="checkbox-group">
        <div class="checkbox-content">
          <t-checkbox v-model="checked1">默认复选框</t-checkbox>
          <t-checkbox v-model="checked2" disabled>禁用状态</t-checkbox>
        </div>
        <div class="data-preview">
          <div class="preview-item">
            <span class="label">默认复选框：</span>
            <span class="value">{{ checked1 }}</span>
          </div>
          <div class="preview-item">
            <span class="label">禁用状态：</span>
            <span class="value">{{ checked2 }}</span>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 复选框样式 -->
    <test-section title="复选框样式">
      <div class="checkbox-group">
        <div class="checkbox-content">
          <t-checkbox v-model="checked3" radius="default">圆形样式</t-checkbox>
          <t-checkbox v-model="checked3" radius="square">方形样式</t-checkbox>
          <t-checkbox v-model="checked3" icon="caret-down">自定义图标</t-checkbox>
        </div>
        <div class="data-preview">
          <div class="preview-item">
            <span class="label">选中状态：</span>
            <span class="value">{{ checked3 }}</span>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 尺寸大小 -->
    <test-section title="尺寸大小">
      <div class="checkbox-group">
        <t-checkbox v-model="checked4" size="small">小尺寸</t-checkbox>
        <t-checkbox v-model="checked4" size="default">默认尺寸</t-checkbox>
        <t-checkbox v-model="checked4" size="large">大尺寸</t-checkbox>
      </div>
    </test-section>

    <!-- 复选框组 -->
    <test-section title="复选框组">
      <div class="checkbox-group">
        <div class="group-item">
          <div class="group-label">默认样式：</div>
          <div class="group-content">
            <t-checkbox-group v-model="groupValue1" type="default">
              <t-checkbox v-for="item in options" :key="item.value" :value="item.value">
                {{ item.label }}
              </t-checkbox>
            </t-checkbox-group>
            <div class="data-preview">
              <div class="preview-item">
                <span class="label">选中值：</span>
                <pre class="value">{{ JSON.stringify(groupValue1, null, 2) }}</pre>
              </div>
            </div>
          </div>
        </div>

        <div class="group-item">
          <div class="group-label">文本样式：</div>
          <t-checkbox-group v-model="groupValue2" type="text">
            <t-checkbox v-for="item in options" :key="item.value" :value="item.value">
              {{ item.label }}
            </t-checkbox>
          </t-checkbox-group>
        </div>

        <div class="group-item">
          <div class="group-label">边框样式：</div>
          <t-checkbox-group v-model="groupValue3" type="border">
            <t-checkbox v-for="item in options" :key="item.value" :value="item.value">
              {{ item.label }}
            </t-checkbox>
          </t-checkbox-group>
        </div>

        <div class="group-item">
          <div class="group-label">按钮样式：</div>
          <t-checkbox-group v-model="groupValue4" type="button">
            <t-checkbox v-for="item in options" :key="item.value" :value="item.value">
              {{ item.label }}
            </t-checkbox>
          </t-checkbox-group>
        </div>
      </div>
    </test-section>

    <!-- 排列方向 -->
    <test-section title="排列方向">
      <div class="checkbox-group">
        <div class="group-item">
          <div class="group-label">水平排列：</div>
          <t-checkbox-group v-model="groupValue5" direction="row">
            <t-checkbox v-for="item in options" :key="item.value" :value="item.value">
              {{ item.label }}
            </t-checkbox>
          </t-checkbox-group>
        </div>

        <div class="group-item">
          <div class="group-label">垂直排列：</div>
          <t-checkbox-group v-model="groupValue6" direction="column">
            <t-checkbox v-for="item in options" :key="item.value" :value="item.value">
              {{ item.label }}
            </t-checkbox>
          </t-checkbox-group>
        </div>
      </div>
    </test-section>

    <!-- 对象数据 -->
    <test-section title="对象数据">
      <div class="checkbox-group">
        <div class="checkbox-content">
          <t-checkbox-group v-model="objGroupValue" objKey="id">
            <t-checkbox v-for="item in objOptions" :key="item.id" :value="item">
              {{ item.name }}
            </t-checkbox>
          </t-checkbox-group>
        </div>
        <div class="data-preview">
          <div class="preview-item">
            <span class="label">选中对象：</span>
            <pre class="value">{{ JSON.stringify(objGroupValue, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 事件测试 -->
    <test-section title="事件测试">
      <div class="checkbox-group">
        <t-checkbox v-model="eventValue" @change="handleChange">点击触发事件</t-checkbox>
        <div class="event-log">
          <div class="event-title">事件记录:</div>
          <div v-for="(event, index) in eventLogs" :key="index" class="event-item">
            {{ event }}
          </div>
        </div>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TCheckbox, TCheckboxGroup } from "@/packages/checkbox";
import TestSection from "./components/test-section.vue";

defineOptions({ name: "CheckboxTest" });

// 基础用法
const checked1 = ref(false);
const checked2 = ref(true);
const checked3 = ref(false);
const checked4 = ref(false);

// 复选框组数据
const options = [
  { label: "选项1", value: 1 },
  { label: "选项2", value: 2 },
  { label: "选项3", value: 3 }
];

const groupValue1 = ref([1]);
const groupValue2 = ref([1]);
const groupValue3 = ref([1]);
const groupValue4 = ref([1]);
const groupValue5 = ref([1]);
const groupValue6 = ref([1]);

// 对象数据
const objOptions = [
  { id: 1, name: "对象1" },
  { id: 2, name: "对象2" },
  { id: 3, name: "对象3" }
];
const objGroupValue = ref([objOptions[0]]);

// 事件测试
const eventValue = ref(false);
const eventLogs = ref<string[]>([]);

/**
 * 处理变更事件
 */
const handleChange = (value?: any) => {
  eventLogs.value.unshift(`change事件触发，当前值: ${value}`);
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
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

  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .checkbox-content {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .group-item {
    display: flex;
    gap: 16px;

    .group-label {
      min-width: 100px;
      padding-top: 4px;
      color: #666;
    }

    .group-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }

  .event-log {
    margin-top: 16px;
    padding: 12px;
    background-color: #f9fafb;
    border-radius: 4px;

    .event-title {
      margin-bottom: 8px;
      font-weight: 500;
      color: #374151;
    }

    .event-item {
      padding: 4px 0;
      color: #666;
      font-size: 14px;
      font-family: monospace;
    }
  }

  .data-preview {
    padding: 12px 16px;
    background-color: #f9fafb;
    border-radius: 6px;
    border: 1px solid #e5e7eb;

    .preview-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 4px 0;

      &:not(:last-child) {
        border-bottom: 1px dashed #e5e7eb;
        padding-bottom: 8px;
        margin-bottom: 8px;
      }

      .label {
        min-width: 90px;
        color: #4b5563;
        font-size: 14px;
      }

      .value {
        font-family: monospace;
        color: #1f2937;
        margin: 0;
        font-size: 14px;

        &:not(pre) {
          padding: 2px 8px;
          background-color: #fff;
          border-radius: 4px;
          border: 1px solid #e5e7eb;
        }
      }

      pre.value {
        flex: 1;
        padding: 12px;
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #e5e7eb;
        margin: 0;
      }
    }
  }
}
</style>
