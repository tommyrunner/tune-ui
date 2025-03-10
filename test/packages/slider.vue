<template>
  <div class="test-container">
    <h2>Slider 滑块组件</h2>

    <h3>横向滑块</h3>

    <!-- 基础滑块 -->
    <test-section title="基础滑块">
      <t-slider v-model="basicValue" />
      <div class="value-display">当前值: {{ basicValue }}</div>
    </test-section>

    <!-- 禁用状态 -->
    <test-section title="禁用状态">
      <t-slider v-model="disabledValue" disabled />
      <div class="value-display">当前值: {{ disabledValue }}</div>
    </test-section>

    <!-- 步长设置 -->
    <test-section title="步长设置">
      <div class="slider-row">
        <span class="slider-label">步长 5:</span>
        <t-slider v-model="stepValue" :step="5" :max="50" />
        <div class="value-display">当前值: {{ stepValue }}</div>
      </div>
      <div class="slider-row">
        <span class="slider-label">步长 10:</span>
        <t-slider v-model="stepValue2" :step="10" :max="100" />
        <div class="value-display">当前值: {{ stepValue2 }}</div>
      </div>
    </test-section>

    <!-- 最小/最大值设置 -->
    <test-section title="最小/最大值设置">
      <div class="slider-row">
        <span class="slider-label">范围 -20 到 20:</span>
        <t-slider v-model="minMaxValue1" :min="-20" :max="20" />
        <div class="value-display">当前值: {{ minMaxValue1 }}</div>
      </div>
      <div class="slider-row">
        <span class="slider-label">范围 0 到 1:</span>
        <t-slider v-model="minMaxValue2" :min="0" :max="1" :step="0.1" />
        <div class="value-display">当前值: {{ minMaxValue2 }}</div>
      </div>
    </test-section>

    <!-- 滑块与数字输入框组合 -->
    <test-section title="滑块与数字输入框组合">
      <div class="slider-input-row">
        <t-slider v-model="inputNumberValue" class="slider-with-input" />
        <t-input-number v-model="inputNumberValue" :min-value="0" :max-value="100" :step="1" is-controls />
      </div>
      <div class="slider-input-row">
        <t-slider v-model="inputNumberRangeValue" range class="slider-with-input" />
        <div class="input-number-range">
          <t-input-number
            v-model="inputNumberRangeValue[0]"
            :min-value="0"
            :max-value="inputNumberRangeValue[1]"
            :step="1"
            @input="updateRangeMin"
          />
          <span class="range-separator">-</span>
          <t-input-number
            v-model="inputNumberRangeValue[1]"
            :min-value="inputNumberRangeValue[0]"
            :max-value="100"
            :step="1"
            @input="updateRangeMax"
          />
        </div>
      </div>
    </test-section>

    <!-- 范围选择 -->
    <test-section title="范围选择">
      <div class="slider-row">
        <span class="slider-label">基础范围:</span>
        <t-slider v-model="rangeValue" range />
        <div class="value-display">当前值: {{ rangeValue }}</div>
      </div>
      <div class="slider-row">
        <span class="slider-label">带步长:</span>
        <t-slider v-model="rangeStepValue" range :step="10" />
        <div class="value-display">当前值: {{ rangeStepValue }}</div>
      </div>
    </test-section>

    <!-- 显示断点 -->
    <test-section title="显示断点">
      <div class="slider-row">
        <span class="slider-label">步长 10:</span>
        <t-slider v-model="stopsValue" :step="10" show-stops />
        <div class="value-display">当前值: {{ stopsValue }}</div>
      </div>
      <div class="slider-row">
        <span class="slider-label">步长 25:</span>
        <t-slider v-model="stopsValue2" :step="25" show-stops />
        <div class="value-display">当前值: {{ stopsValue2 }}</div>
      </div>
    </test-section>

    <!-- 提示设置 -->
    <test-section title="提示设置">
      <div class="slider-row">
        <span class="slider-label">显示提示:</span>
        <t-slider v-model="tooltipValue" show-tooltip />
      </div>
      <div class="slider-row">
        <span class="slider-label">隐藏提示:</span>
        <t-slider v-model="tooltipValue" :show-tooltip="false" />
      </div>
      <div class="slider-row">
        <span class="slider-label">自定义提示:</span>
        <t-slider v-model="formatValue" :format-tooltip="value => `${value}%`" />
      </div>
      <div class="slider-row">
        <span class="slider-label">提示类名:</span>
        <t-slider v-model="tooltipClassValue" tooltip-class="custom-tooltip" />
      </div>
    </test-section>
    <!-- 滑块大小设置 -->
    <test-section title="滑块大小设置">
      <div class="slider-group">
        <div class="slider-item">
          <div class="slider-header">
            <span class="slider-label">默认尺寸 (6px)</span>
            <span class="slider-desc">适用于常规场景，与其他组件搭配使用</span>
          </div>
          <t-slider v-model="sizeDefaultValue" />
          <div class="value-display">当前值: {{ sizeDefaultValue }}</div>
        </div>

        <div class="slider-item">
          <div class="slider-header">
            <span class="slider-label">中等尺寸 (8px)</span>
            <span class="slider-desc">适用于需要稍微突出的场景</span>
          </div>
          <t-slider v-model="sizeMediumValue" :size="8" />
          <div class="value-display">当前值: {{ sizeMediumValue }}</div>
        </div>

        <div class="slider-item">
          <div class="slider-header">
            <span class="slider-label">大尺寸 (12px)</span>
            <span class="slider-desc">适用于需要醒目的场景</span>
          </div>
          <t-slider v-model="sizeLargeValue" :size="12" />
          <div class="value-display">当前值: {{ sizeLargeValue }}</div>
        </div>

        <div class="slider-item">
          <div class="slider-header">
            <span class="slider-label">超大尺寸 (16px)</span>
            <span class="slider-desc">适用于特殊强调的场景</span>
          </div>
          <t-slider v-model="sizeXLargeValue" :size="16" />
          <div class="value-display">当前值: {{ sizeXLargeValue }}</div>
        </div>
      </div>
    </test-section>

    <!-- 提示位置 -->
    <test-section title="提示位置">
      <div class="slider-row">
        <span class="slider-label">上方:</span>
        <t-slider v-model="placementValue" placement="top" />
      </div>
      <div class="slider-row">
        <span class="slider-label">右侧:</span>
        <t-slider v-model="placementValue" placement="right" />
      </div>
      <div class="slider-row">
        <span class="slider-label">下方:</span>
        <t-slider v-model="placementValue" placement="bottom" />
      </div>
      <div class="slider-row">
        <span class="slider-label">左侧:</span>
        <t-slider v-model="placementValue" placement="left" />
      </div>
    </test-section>

    <!-- 标记 -->
    <test-section title="标记">
      <div class="slider-row">
        <span class="slider-label">基础标记:</span>
        <t-slider v-model="marksValue" :marks="marks" />
      </div>
      <div class="slider-row">
        <span class="slider-label">带范围:</span>
        <t-slider v-model="marksRangeValue" :marks="marks" range />
      </div>
    </test-section>

    <!-- 不同状态 -->
    <test-section title="不同状态">
      <div class="slider-row">
        <span class="slider-label">成功状态:</span>
        <t-slider v-model="statusValue" status="success" />
      </div>
      <div class="slider-row">
        <span class="slider-label">警告状态:</span>
        <t-slider v-model="statusValue" status="warning" />
      </div>
      <div class="slider-row">
        <span class="slider-label">异常状态:</span>
        <t-slider v-model="statusValue" status="exception" />
      </div>
    </test-section>

    <!-- 去抖动延迟 -->
    <test-section title="去抖动延迟">
      <div class="slider-row">
        <span class="slider-label">默认延迟:</span>
        <t-slider v-model="debounceValue" />
      </div>
      <div class="slider-row">
        <span class="slider-label">短延迟:</span>
        <t-slider v-model="debounceValue" :debounce="100" />
      </div>
      <div class="slider-row">
        <span class="slider-label">长延迟:</span>
        <t-slider v-model="debounceValue" :debounce="1000" />
      </div>
    </test-section>

    <!-- 事件处理 -->
    <test-section title="事件处理">
      <t-slider v-model="eventValue" @change="handleChange" @input="handleInput" />
      <div class="value-display">当前值: {{ eventValue }}</div>
      <div class="event-log">
        <div>事件日志:</div>
        <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
          {{ log }}
        </div>
      </div>
    </test-section>

    <h3>垂直滑块</h3>

    <!-- 垂直基础滑块 -->
    <test-section title="垂直基础滑块">
      <div class="vertical-container">
        <t-slider v-model="verticalValue" vertical height="200px" />
        <div class="value-display">当前值: {{ verticalValue }}</div>
      </div>
    </test-section>

    <!-- 垂直范围滑块 -->
    <test-section title="垂直范围滑块">
      <div class="vertical-container">
        <t-slider v-model="verticalRangeValue" vertical range height="200px" />
        <div class="value-display">当前值: {{ verticalRangeValue }}</div>
      </div>
    </test-section>

    <!-- 垂直带断点 -->
    <test-section title="垂直带断点">
      <div class="vertical-container">
        <t-slider v-model="verticalStopsValue" vertical :step="10" show-stops height="200px" />
        <div class="value-display">当前值: {{ verticalStopsValue }}</div>
      </div>
    </test-section>

    <!-- 垂直带标记 -->
    <test-section title="垂直带标记">
      <div class="vertical-container">
        <t-slider v-model="verticalMarksValue" vertical :marks="marks" height="200px" />
        <div class="value-display">当前值: {{ verticalMarksValue }}</div>
      </div>
    </test-section>

    <!-- 垂直不同状态 -->
    <test-section title="垂直不同状态">
      <div class="vertical-status-container">
        <div class="vertical-status-item">
          <span class="status-label">成功:</span>
          <t-slider v-model="verticalStatusValue" vertical status="success" height="200px" />
        </div>
        <div class="vertical-status-item">
          <span class="status-label">警告:</span>
          <t-slider v-model="verticalStatusValue" vertical status="warning" height="200px" />
        </div>
        <div class="vertical-status-item">
          <span class="status-label">异常:</span>
          <t-slider v-model="verticalStatusValue" vertical status="exception" height="200px" />
        </div>
      </div>
    </test-section>

    <!-- 垂直滑块大小设置 -->
    <test-section title="垂直滑块大小设置">
      <div class="vertical-slider-container">
        <div class="vertical-slider-item">
          <div class="slider-header">
            <span class="slider-label">默认尺寸 (6px)</span>
            <span class="slider-desc">常规垂直场景</span>
          </div>
          <t-slider v-model="verticalSizeDefaultValue" vertical height="200px" />
          <div class="value-display">{{ verticalSizeDefaultValue }}</div>
        </div>

        <div class="vertical-slider-item">
          <div class="slider-header">
            <span class="slider-label">中等尺寸 (8px)</span>
            <span class="slider-desc">稍宽垂直场景</span>
          </div>
          <t-slider v-model="verticalSizeMediumValue" vertical height="200px" :size="8" />
          <div class="value-display">{{ verticalSizeMediumValue }}</div>
        </div>

        <div class="vertical-slider-item">
          <div class="slider-header">
            <span class="slider-label">大尺寸 (12px)</span>
            <span class="slider-desc">醒目垂直场景</span>
          </div>
          <t-slider v-model="verticalSizeLargeValue" vertical height="200px" :size="12" />
          <div class="value-display">{{ verticalSizeLargeValue }}</div>
        </div>

        <div class="vertical-slider-item">
          <div class="slider-header">
            <span class="slider-label">超大尺寸 (16px)</span>
            <span class="slider-desc">特殊强调垂直场景</span>
          </div>
          <t-slider v-model="verticalSizeXLargeValue" vertical height="200px" :size="16" />
          <div class="value-display">{{ verticalSizeXLargeValue }}</div>
        </div>
      </div>
    </test-section>

    <!-- 自定义按钮 -->
    <h3>自定义按钮</h3>

    <!-- 文本自定义按钮 -->
    <test-section title="文本自定义按钮">
      <div class="slider-row">
        <span class="slider-label">简单文本:</span>
        <t-slider v-model="customButtonTextValue">
          <template #button="{ value }">
            <div class="custom-button custom-button--text">
              {{ value }}
            </div>
          </template>
        </t-slider>
        <div class="value-display">当前值: {{ customButtonTextValue }}</div>
      </div>
    </test-section>

    <!-- 图标自定义按钮 -->
    <test-section title="图标自定义按钮">
      <div class="slider-row">
        <span class="slider-label">带图标:</span>
        <t-slider v-model="customButtonIconValue">
          <template #button="{ value, dragging }">
            <div :class="['custom-button', 'custom-button--icon', { 'is-dragging': dragging }]">
              <t-icon icon="success" :size="14" color="#ff9f43" />
              <div class="tooltip" v-if="dragging">{{ Math.round(value) }}</div>
            </div>
          </template>
        </t-slider>
        <div class="value-display">当前值: {{ customButtonIconValue }}</div>
      </div>
    </test-section>

    <!-- 范围选择自定义按钮 -->
    <test-section title="范围选择自定义按钮">
      <div class="slider-row">
        <span class="slider-label">范围选择:</span>
        <t-slider v-model="customButtonRangeValue" range>
          <template #button="{ value, index }">
            <div class="custom-button custom-button--range">
              <t-icon :icon="index === 0 ? 'left' : 'right'" :size="12" color="#409eff" />
              <div class="value">{{ value }}</div>
            </div>
          </template>
        </t-slider>
        <div class="value-display">当前值: {{ customButtonRangeValue }}</div>
      </div>
    </test-section>

    <!-- 垂直模式自定义按钮 -->
    <test-section title="垂直自定义按钮">
      <div class="vertical-custom-container">
        <t-slider v-model="customButtonVerticalValue" vertical height="200px">
          <template #button="{ value, vertical }">
            <div :class="['custom-button', { 'is-vertical': vertical }]">
              {{ value }}
            </div>
          </template>
        </t-slider>
        <div class="value-display">当前值: {{ customButtonVerticalValue }}</div>
      </div>
    </test-section>

    <!-- 状态响应自定义按钮 -->
    <test-section title="状态响应按钮">
      <div class="slider-row">
        <span class="slider-label">状态感知:</span>
        <t-slider v-model="customButtonStateValue" :disabled="customButtonDisabled">
          <template #button="{ value, disabled, dragging }">
            <div :class="['custom-button', { 'is-disabled': disabled, 'is-dragging': dragging }]">
              <div class="state-icon">
                <t-icon
                  :icon="disabled ? 'close' : dragging ? 'success' : 'success-to'"
                  :size="14"
                  :color="disabled ? '#9ca3af' : '#0ea5e9'"
                />
              </div>
              <div class="state-value">{{ value }}</div>
            </div>
          </template>
        </t-slider>
        <div class="custom-controls">
          <button @click="customButtonDisabled = !customButtonDisabled">
            {{ customButtonDisabled ? "启用" : "禁用" }}
          </button>
        </div>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TSlider } from "@/packages/slider";
import { TInputNumber } from "@/packages/input-number";
import { TIcon } from "@/packages/icon";
import TestSection from "../components/test-section.vue";

defineOptions({ name: "SliderTest" });

// 横向滑块
// 基础滑块
const basicValue = ref(50);

// 禁用状态
const disabledValue = ref(30);

// 步长设置
const stepValue = ref(20);
const stepValue2 = ref(30);

// 最小/最大值设置
const minMaxValue1 = ref(0);
const minMaxValue2 = ref(0.5);

// 滑块与数字输入框组合
const inputNumberValue = ref(50);
const inputNumberRangeValue = ref([20, 80]);

// 更新范围值
const updateRangeMin = (value: number) => {
  inputNumberRangeValue.value = [value, inputNumberRangeValue.value[1]];
};

const updateRangeMax = (value: number) => {
  inputNumberRangeValue.value = [inputNumberRangeValue.value[0], value];
};

// 范围选择
const rangeValue = ref([20, 60]);
const rangeStepValue = ref([30, 70]);

// 显示断点
const stopsValue = ref(40);
const stopsValue2 = ref(50);

// 提示设置
const tooltipValue = ref(45);
const formatValue = ref(70);
const tooltipClassValue = ref(55);

// 提示位置
const placementValue = ref(50);

// 不同尺寸
// const sizeValue = ref(45);

// 标记
const marksValue = ref(50);
const marksRangeValue = ref([25, 75]);
const marks = {
  0: "0°C",
  25: "25°C",
  50: "50°C",
  75: "75°C",
  100: {
    label: "100°C",
    style: {
      color: "#ff0000"
    }
  }
};

// 不同状态
const statusValue = ref(60);

// 去抖动延迟
const debounceValue = ref(50);

// 事件处理
const eventValue = ref(50);
const eventLogs = ref<string[]>([]);

// 垂直滑块
const verticalValue = ref(50);
const verticalRangeValue = ref([20, 70]);
const verticalStopsValue = ref(40);
const verticalMarksValue = ref(50);
const verticalStatusValue = ref(60);

// 滑块大小测试数据
const sizeDefaultValue = ref(50);
const sizeMediumValue = ref(50);
const sizeLargeValue = ref(50);
const sizeXLargeValue = ref(50);

// 垂直滑块大小测试数据
const verticalSizeDefaultValue = ref(50);
const verticalSizeMediumValue = ref(50);
const verticalSizeLargeValue = ref(50);
const verticalSizeXLargeValue = ref(50);

// 自定义按钮测试数据
const customButtonTextValue = ref(45);
const customButtonIconValue = ref(60);
const customButtonRangeValue = ref([25, 75]);
const customButtonVerticalValue = ref(55);
const customButtonStateValue = ref(50);
const customButtonDisabled = ref(false);

/**
 * 处理change事件
 */
const handleChange = (value: number | number[]) => {
  eventLogs.value.unshift(`Change事件: ${value}`);
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};

/**
 * 处理input事件
 */
const handleInput = (value: number | number[]) => {
  eventLogs.value.unshift(`Input事件: ${value}`);
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
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

  h3 {
    margin: 32px 0 16px;
    font-weight: 600;
    font-size: 22px;
    color: #374151;
    border-bottom: 1px dashed #e5e7eb;
    padding-bottom: 8px;
  }

  :deep(.test-section) {
    .test-section-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }

  .value-display {
    margin-top: 8px;
    font-size: 14px;
    color: #6b7280;
  }

  .slider-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;

    .slider-label {
      width: 100px;
      font-size: 14px;
      color: #4b5563;
    }

    .t-slider {
      flex: 1;
    }
  }

  .slider-input-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;

    .slider-with-input {
      flex: 1;
    }

    .input-number-range {
      display: flex;
      align-items: center;
      gap: 8px;

      .range-separator {
        color: #6b7280;
      }
    }
  }

  .vertical-container {
    height: 220px;
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .vertical-status-container {
    height: 220px;
    display: flex;
    justify-content: space-around;

    .vertical-status-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;

      .status-label {
        font-size: 14px;
        color: #4b5563;
      }
    }
  }

  .event-log {
    margin-top: 16px;
    padding: 12px;
    background-color: #f9fafb;
    border-radius: 4px;
    font-size: 14px;

    .log-item {
      padding: 4px 0;
      border-bottom: 1px dashed #e5e7eb;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .slider-group {
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin: 20px 0;
  }

  .slider-item {
    width: 100%;
  }

  .slider-header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }

  .slider-label {
    font-weight: 500;
    margin-right: 12px;
    min-width: 120px;
  }

  .slider-desc {
    color: #666;
    font-size: 14px;
  }

  .vertical-slider-container {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    height: 300px;
    margin: 20px 0;
  }

  .vertical-slider-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    min-width: 200px;

    .slider-header {
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-bottom: 20px;

      .slider-label {
        margin-right: 0;
        margin-bottom: 4px;
      }
    }
  }

  // 自定义按钮相关样式
  .custom-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #fff;
    font-size: 12px;
    font-weight: 500;
    position: relative;
    box-sizing: border-box;
  }

  .custom-button--text {
    color: #409eff;
    border: 2px solid #409eff;
    background-color: #ecf5ff;
  }

  .custom-button--icon {
    border: 2px solid #ff9f43;
    transition: all 0.3s;

    &.is-dragging {
      transform: scale(1.2);
      box-shadow: 0 0 10px rgba(255, 159, 67, 0.5);
    }

    .icon {
      font-size: 14px;
    }

    .tooltip {
      position: absolute;
      top: -30px;
      background-color: #ff9f43;
      color: white;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
    }
  }

  .custom-button--range {
    display: flex;
    flex-direction: column;
    border: 2px solid #409eff;

    .icon {
      font-size: 12px;
    }

    .value {
      font-size: 10px;
      margin-top: -3px;
    }
  }

  .is-vertical {
    background-color: #e6f7ff;
    border: 2px solid #1890ff;
    color: #1890ff;
  }

  .vertical-custom-container {
    height: 220px;
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .custom-controls {
    margin-left: 16px;

    button {
      padding: 4px 12px;
      background-color: #f3f4f6;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        background-color: #e5e7eb;
      }
    }
  }

  // 状态响应按钮样式
  .custom-button {
    &.is-disabled {
      background-color: #f3f4f6;
      border: 2px solid #d1d5db;
      color: #9ca3af;
      cursor: not-allowed;
    }

    &.is-dragging {
      background-color: #f0f9ff;
      border: 2px solid #0ea5e9;
    }

    .state-icon {
      font-size: 14px;
    }

    .state-value {
      font-size: 10px;
      margin-top: 2px;
    }
  }
}
</style>
