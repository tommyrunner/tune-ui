<template>
  <div class="test-container">
    <h2>Slider 滑块组件</h2>

    <!-- 基础滑块 -->
    <test-section title="基础滑块">
      <div class="slider-intro">
        <p>默认参数的滑块组件：步长为1，范围0-100</p>
      </div>
      <t-slider v-model="basicValue" />
      <div class="value-display">
        <div>当前值: {{ basicValue }}</div>
        <div>默认参数: min=0, max=100, step=1</div>
      </div>
    </test-section>

    <!-- 禁用状态 -->
    <test-section title="禁用状态">
      <t-slider v-model="disabledValue" disabled />
      <div class="value-display">当前值: {{ disabledValue }} (已禁用)</div>
    </test-section>

    <!-- 最大值和最小值 -->
    <test-section title="最大值和最小值">
      <t-slider v-model="minMaxValue" :min="-20" :max="20" />
      <div class="value-display">
        <div>当前值: {{ minMaxValue }}</div>
        <div>范围: -20 到 20</div>
      </div>
    </test-section>

    <!-- 步长设置 -->
    <test-section title="步长设置">
      <div class="slider-intro">
        <p>通过step属性设置滑块的步长，默认步长为1</p>
      </div>
      <div class="slider-config">
        <span>步长值:</span>
        <div class="config-buttons">
          <button @click="currentStep = 1" :class="{ active: currentStep === 1 }">1 (默认)</button>
          <button @click="currentStep = 5" :class="{ active: currentStep === 5 }">5</button>
          <button @click="currentStep = 10" :class="{ active: currentStep === 10 }">10</button>
          <button @click="currentStep = 20" :class="{ active: currentStep === 20 }">20</button>
        </div>
        <span class="current-value">当前: {{ currentStep }}</span>
      </div>
      <t-slider v-model="stepValue" :step="currentStep" />
      <div class="value-display">
        <div>当前值: {{ stepValue }}</div>
        <div>步长: {{ currentStep }}</div>
        <div>说明: 步长决定了滑块可以选择的值的间隔，值必须是步长的倍数</div>
        <div>效果: 拖动结束时会自动吸附到最近的步长值</div>
      </div>
    </test-section>

    <!-- 粗细尺寸设置 -->
    <test-section title="粗细尺寸设置">
      <div class="slider-config">
        <span>滑块尺寸:</span>
        <div class="config-buttons">
          <button @click="trackSize = 4" :class="{ active: trackSize === 4 }">细(4px)</button>
          <button @click="trackSize = 6" :class="{ active: trackSize === 6 }">中等(6px)</button>
          <button @click="trackSize = 8" :class="{ active: trackSize === 8 }">粗(8px)</button>
        </div>
      </div>
      <t-slider v-model="trackSizeValue" :size="trackSize" />
      <div class="value-display">
        <div>当前值: {{ trackSizeValue }}</div>
        <div>滑块尺寸: {{ trackSize }}px</div>
        <div>说明: 通过size属性控制滑块轨道的粗细</div>
        <div>开发说明: 横向模式控制轨道高度，垂直模式控制轨道宽度</div>
      </div>
    </test-section>

    <!-- 显示断点 -->
    <test-section title="显示断点">
      <div class="slider-config">
        <span>步长值:</span>
        <div class="config-buttons">
          <button @click="stopsStep = 5" :class="{ active: stopsStep === 5 }">5</button>
          <button @click="stopsStep = 10" :class="{ active: stopsStep === 10 }">10</button>
          <button @click="stopsStep = 20" :class="{ active: stopsStep === 20 }">20</button>
          <button @click="stopsStep = 25" :class="{ active: stopsStep === 25 }">25</button>
        </div>
        <span class="current-value">当前: {{ stopsStep }}</span>
      </div>
      <t-slider v-model="stopsValue" :step="stopsStep" show-stops />
      <div class="value-display">
        <div>当前值: {{ stopsValue }}</div>
        <div>步长: {{ stopsStep }}</div>
        <div>断点数量: {{ Math.floor(100 / stopsStep) - 1 }}个</div>
        <div>说明: 断点在轨道上显示可选择的值的位置，对应步长值</div>
      </div>
    </test-section>

    <!-- 显示/隐藏提示信息 -->
    <test-section title="显示/隐藏提示信息">
      <div class="slider-config">
        <span>提示信息:</span>
        <div class="config-buttons">
          <button @click="showTooltipValue = true" :class="{ active: showTooltipValue }">显示</button>
          <button @click="showTooltipValue = false" :class="{ active: !showTooltipValue }">隐藏</button>
        </div>
      </div>
      <t-slider v-model="tooltipValue" :show-tooltip="showTooltipValue" />
      <div class="value-display">
        <div>当前值: {{ tooltipValue }}</div>
        <div>提示信息: {{ showTooltipValue ? "显示" : "隐藏" }}</div>
        <div>说明: 可以控制滑块拖动时是否显示当前值的提示信息</div>
      </div>
    </test-section>

    <!-- 仅允许选择步长值 -->
    <test-section title="仅允许选择步长值">
      <div class="slider-config">
        <span>步长值:</span>
        <div class="config-buttons">
          <button @click="onlyStepsStepValue = 5" :class="{ active: onlyStepsStepValue === 5 }">5</button>
          <button @click="onlyStepsStepValue = 10" :class="{ active: onlyStepsStepValue === 10 }">10</button>
          <button @click="onlyStepsStepValue = 25" :class="{ active: onlyStepsStepValue === 25 }">25</button>
        </div>
        <span class="current-value">当前: {{ onlyStepsStepValue }}</span>
      </div>
      <t-slider v-model="onlyStepsValue" :step="onlyStepsStepValue" :only-steps="true" show-stops />
      <div class="value-display">
        <div>当前值: {{ onlyStepsValue }}</div>
        <div>步长: {{ onlyStepsStepValue }}</div>
        <div>说明: 拖动过程中只能选择对应步长的值，拖动时值会实时吸附到步长值</div>
        <div>与普通步长的区别: 普通步长只在拖动结束时吸附，此模式在拖动过程中就会吸附</div>
      </div>
    </test-section>

    <!-- 范围选择 -->
    <test-section title="范围选择">
      <t-slider v-model="rangeValue" range />
      <div class="value-display">
        <div>当前值: {{ rangeValue }}</div>
        <div>最小值: {{ Array.isArray(rangeValue) ? rangeValue[0] : "-" }}</div>
        <div>最大值: {{ Array.isArray(rangeValue) ? rangeValue[1] : "-" }}</div>
      </div>
    </test-section>

    <!-- 范围选择带步长和断点 -->
    <test-section title="范围选择带步长和断点">
      <div class="slider-config">
        <span>步长值:</span>
        <div class="config-buttons">
          <button @click="rangeStepsStepValue = 5" :class="{ active: rangeStepsStepValue === 5 }">5</button>
          <button @click="rangeStepsStepValue = 10" :class="{ active: rangeStepsStepValue === 10 }">10</button>
          <button @click="rangeStepsStepValue = 20" :class="{ active: rangeStepsStepValue === 20 }">20</button>
        </div>
        <span class="current-value">当前: {{ rangeStepsStepValue }}</span>
      </div>
      <t-slider v-model="rangeStepsValue" range :step="rangeStepsStepValue" show-stops />
      <div class="value-display">
        <div>当前值: {{ rangeStepsValue }}</div>
        <div>最小值: {{ Array.isArray(rangeStepsValue) ? rangeStepsValue[0] : "-" }}</div>
        <div>最大值: {{ Array.isArray(rangeStepsValue) ? rangeStepsValue[1] : "-" }}</div>
        <div>步长: {{ rangeStepsStepValue }}</div>
        <div>说明: 范围滑块中，两个滑块都会按照步长的间隔进行调整</div>
      </div>
    </test-section>

    <!-- 垂直模式测试区域 -->
    <test-section title="垂直模式测试">
      <div class="vertical-test-container">
        <!-- 基础垂直滑块 -->
        <div class="vertical-test-item">
          <h4>基础垂直滑块</h4>
          <div class="vertical-slider">
            <t-slider v-model="verticalValue" vertical />
          </div>
          <div class="value-display mini">
            <div>当前值: {{ verticalValue }}</div>
          </div>
        </div>

        <!-- 垂直滑块带步长 -->
        <div class="vertical-test-item">
          <h4>垂直滑块带步长</h4>
          <div class="slider-config mini">
            <span>步长:</span>
            <div class="config-buttons mini">
              <button @click="verticalStepValue = 10" :class="{ active: verticalStepValue === 10 }">10</button>
              <button @click="verticalStepValue = 20" :class="{ active: verticalStepValue === 20 }">20</button>
            </div>
          </div>
          <div class="vertical-slider">
            <t-slider v-model="verticalStepsValue" vertical :step="verticalStepValue" show-stops />
          </div>
          <div class="value-display mini">
            <div>值: {{ verticalStepsValue }}</div>
            <div>步长: {{ verticalStepValue }}</div>
          </div>
        </div>

        <!-- 垂直范围滑块 -->
        <div class="vertical-test-item">
          <h4>垂直范围滑块</h4>
          <div class="vertical-slider">
            <t-slider v-model="verticalRangeValue" vertical range />
          </div>
          <div class="value-display mini">
            <div>当前值: {{ verticalRangeValue }}</div>
            <div>最小: {{ Array.isArray(verticalRangeValue) ? verticalRangeValue[0] : "-" }}</div>
            <div>最大: {{ Array.isArray(verticalRangeValue) ? verticalRangeValue[1] : "-" }}</div>
          </div>
        </div>

        <!-- 垂直范围带步长 -->
        <div class="vertical-test-item">
          <h4>垂直范围带步长</h4>
          <div class="vertical-slider">
            <t-slider v-model="verticalRangeStepsValue" vertical range :step="10" show-stops />
          </div>
          <div class="value-display mini">
            <div>当前值: {{ verticalRangeStepsValue }}</div>
            <div>步长: 10</div>
          </div>
        </div>

        <!-- 垂直滑块粗细设置 -->
        <div class="vertical-test-item">
          <h4>垂直滑块粗细设置</h4>
          <div class="slider-config mini">
            <span>滑块尺寸:</span>
            <div class="config-buttons mini">
              <button @click="verticalTrackSize = 4" :class="{ active: verticalTrackSize === 4 }">细(4px)</button>
              <button @click="verticalTrackSize = 6" :class="{ active: verticalTrackSize === 6 }">中等(6px)</button>
              <button @click="verticalTrackSize = 8" :class="{ active: verticalTrackSize === 8 }">粗(8px)</button>
            </div>
          </div>
          <div class="vertical-slider">
            <t-slider v-model="verticalTrackSizeValue" vertical :size="verticalTrackSize" />
          </div>
          <div class="value-display mini">
            <div>值: {{ verticalTrackSizeValue }}</div>
            <div>滑块尺寸: {{ verticalTrackSize }}px</div>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 标记点 -->
    <test-section title="标记点">
      <t-slider v-model="marksValue" :marks="marks" />
      <div class="value-display">
        <div>当前值: {{ marksValue }}</div>
        <div>
          标记点:
          <span v-for="(value, key) in marks" :key="key">{{ key }}℃ ({{ value }}), </span>
        </div>
        <div>说明: 标记点显示在滑块下方，用于标记特定的值</div>
      </div>
    </test-section>

    <!-- 带断点的标记点 -->
    <test-section title="带断点的标记点">
      <div class="slider-config">
        <span>步长值:</span>
        <div class="config-buttons">
          <button @click="marksStepValue = 10" :class="{ active: marksStepValue === 10 }">10</button>
          <button @click="marksStepValue = 25" :class="{ active: marksStepValue === 25 }">25</button>
          <button @click="marksStepValue = 50" :class="{ active: marksStepValue === 50 }">50</button>
        </div>
        <span class="current-value">当前: {{ marksStepValue }}</span>
      </div>
      <t-slider v-model="marksWithStopsValue" :marks="marks" :step="marksStepValue" show-stops />
      <div class="value-display">
        <div>当前值: {{ marksWithStopsValue }}</div>
        <div>步长: {{ marksStepValue }}</div>
        <div>
          标记点:
          <span v-for="(value, key) in marks" :key="key">{{ key }}℃ ({{ value }}), </span>
        </div>
        <div>说明: 标记点和断点可以同时使用，标记点标识特定值，断点显示步长间隔</div>
      </div>
    </test-section>

    <!-- 提示格式化 -->
    <test-section title="提示格式化">
      <div class="slider-config">
        <span>格式化函数: </span>
        <select v-model="currentFormatType">
          <option value="percent">百分比</option>
          <option value="temperature">温度</option>
          <option value="money">金额</option>
        </select>
      </div>
      <t-slider v-model="formatValue" :format-tooltip="getFormatFunction" show-tooltip />
      <div class="value-display">
        <div>当前值: {{ formatValue }}</div>
        <div>格式化后: {{ getFormatFunction(formatValue) }}</div>
        <div>格式化类型: {{ currentFormatType }}</div>
      </div>
    </test-section>

    <!-- 滑块与数字输入框结合 -->
    <test-section title="滑块与数字输入框结合">
      <div class="slider-input-container">
        <div class="slider-wrapper">
          <t-slider v-model="inputNumberValue" :min="0" :max="100" :step="1" />
        </div>
        <div class="input-number-wrapper">
          <t-input-number v-model="inputNumberValue" :min="0" :max="100" :step="1" />
        </div>
      </div>
      <div class="value-display">
        <div>当前值: {{ inputNumberValue }}</div>
        <div>说明: 滑块与数字输入框双向绑定，可以实现精确的数值输入</div>
      </div>
    </test-section>

    <!-- 范围滑块与数字输入框结合 -->
    <test-section title="范围滑块与数字输入框结合">
      <div class="slider-input-container">
        <div class="slider-wrapper">
          <t-slider v-model="rangeInputNumberValue" range :min="0" :max="100" :step="1" />
        </div>
        <div class="range-input-wrapper">
          <span>最小值:</span>
          <t-input-number v-model="minRangeValue" :min="0" :max="maxRangeValue" :step="1" @change="updateRangeValue" />
          <span>最大值:</span>
          <t-input-number v-model="maxRangeValue" :min="minRangeValue" :max="100" :step="1" @change="updateRangeValue" />
        </div>
      </div>
      <div class="value-display">
        <div>当前值: {{ rangeInputNumberValue }}</div>
        <div>最小值: {{ minRangeValue }}</div>
        <div>最大值: {{ maxRangeValue }}</div>
        <div>说明: 范围滑块与两个数字输入框结合，可以精确设置范围的起始值和结束值</div>
      </div>
    </test-section>

    <!-- 事件测试 -->
    <test-section title="事件测试">
      <t-slider v-model="eventValue" @change="handleChange" @input="handleInput" />
      <div class="value-display">
        <div>当前值: {{ eventValue }}</div>
        <div>最后一次改变: {{ lastChangeValue }} (触发change事件)</div>
        <div>最后一次输入: {{ lastInputValue }} (触发input事件)</div>
        <div>说明: 拖动时会触发input事件，拖动结束时触发change事件</div>
      </div>
    </test-section>

    <!-- 自定义滑块按钮 -->
    <test-section title="自定义滑块按钮">
      <div class="slider-intro">
        <p>通过插槽自定义滑块按钮，可以替换为图标或其他元素</p>
      </div>

      <!-- 单滑块自定义按钮 -->
      <div class="custom-slider-demo">
        <h4>单滑块自定义按钮</h4>
        <t-slider v-model="customButtonValue">
          <template #button="{ dragging }">
            <div class="custom-button" :class="{ 'is-dragging': dragging }">
              <t-icon icon="reduce" :size="12" color="#409eff" />
            </div>
          </template>
        </t-slider>
        <div class="value-display">当前值: {{ customButtonValue }}</div>
      </div>

      <!-- 范围滑块自定义按钮 -->
      <div class="custom-slider-demo">
        <h4>范围滑块自定义按钮</h4>
        <t-slider v-model="customRangeValue" range>
          <template #minButton="{ dragging }">
            <div class="custom-button min-button" :class="{ 'is-dragging': dragging }">
              <t-icon icon="filter" :size="12" color="#409eff" />
            </div>
          </template>
          <template #maxButton="{ dragging }">
            <div class="custom-button max-button" :class="{ 'is-dragging': dragging }">
              <t-icon icon="reduce" :size="12" color="#409eff" />
            </div>
          </template>
        </t-slider>
        <div class="value-display">当前值: {{ customRangeValue }}</div>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { TSlider } from "@/packages/slider";
import { TInputNumber } from "@/packages/input-number";
import { TIcon } from "@/packages/icon";
import TestSection from "../components/test-section.vue";

defineOptions({ name: "SliderTest" });

// 基础值
const basicValue = ref(50);
const disabledValue = ref(30);
const minMaxValue = ref(0);
const stepValue = ref(30);
const currentStep = ref(10);
const stopsValue = ref(40);
const stopsStep = ref(10);
const onlyStepsValue = ref(30);
const onlyStepsStepValue = ref(10);
const rangeValue = ref([20, 60]);
const rangeStepsValue = ref([20, 70]);
const rangeStepsStepValue = ref(10);
const tooltipValue = ref(40);
const showTooltipValue = ref(true);
const verticalValue = ref(70);
const verticalStepValue = ref(10);
const verticalStepsValue = ref(50);
const verticalRangeValue = ref([30, 80]);
const verticalRangeStepsValue = ref([20, 60]);
const verticalTrackSizeValue = ref(50);
const verticalTrackSize = ref(6);
const marksValue = ref(50);
const marksWithStopsValue = ref(50);
const marksStepValue = ref(25);
const formatValue = ref(50);
const currentFormatType = ref("percent");
const eventValue = ref(50);
const trackSizeValue = ref(50);
const trackSize = ref(6);

// 滑块与数字输入框结合
const inputNumberValue = ref(50);
const rangeInputNumberValue = ref([25, 75]);
const minRangeValue = ref(25);
const maxRangeValue = ref(75);

// 记录事件值
const lastChangeValue = ref<number | number[]>(0);
const lastInputValue = ref<number | number[]>(0);

// 标记点
const marks = {
  0: "0°C",
  25: "25°C",
  50: "50°C",
  75: "75°C",
  100: "100°C"
};

// 自定义按钮
const customButtonValue = ref(40);
const customRangeValue = ref([20, 80]);

/**
 * 获取当前选择的格式化函数
 * @param value 滑块值
 * @returns 格式化后的字符串
 */
const getFormatFunction = (value: number): string => {
  switch (currentFormatType.value) {
    case "percent":
      return `${value}%`;
    case "temperature":
      return `${value}°C`;
    case "money":
      return `¥${value}`;
    default:
      return `${value}`;
  }
};

/**
 * 处理值变化事件
 * @param value 变化后的值
 */
const handleChange = (value: number | number[]) => {
  console.log("change 事件触发:", value);
  lastChangeValue.value = value;
};

/**
 * 处理输入事件
 * @param value 输入的值
 */
const handleInput = (value: number | number[]) => {
  console.log("input 事件触发:", value);
  lastInputValue.value = value;
};

/**
 * 更新范围滑块的值
 */
const updateRangeValue = () => {
  rangeInputNumberValue.value = [minRangeValue.value, maxRangeValue.value];
};

// 监听范围滑块值的变化，更新输入框的值
watch(rangeInputNumberValue, newValue => {
  if (Array.isArray(newValue)) {
    minRangeValue.value = newValue[0];
    maxRangeValue.value = newValue[1];
  }
});
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

  .slider-intro {
    margin-bottom: 16px;
    p {
      font-size: 14px;
      color: #6b7280;
      line-height: 1.5;
    }
  }

  .slider-config {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;

    span {
      font-size: 14px;
      color: #4b5563;
    }

    .current-value {
      font-weight: bold;
      color: #2563eb;
    }

    .config-buttons {
      display: flex;
      gap: 5px;

      button {
        padding: 2px 8px;
        background-color: #f3f4f6;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.2s;

        &:hover {
          background-color: #e5e7eb;
        }
        &.active {
          background-color: #2563eb;
          color: white;
          border-color: #2563eb;
        }
      }
    }

    &.mini {
      margin-bottom: 8px;
      font-size: 12px;

      .config-buttons.mini button {
        padding: 1px 6px;
        font-size: 11px;
      }
    }

    select {
      padding: 2px 8px;
      background-color: #f9fafb;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      font-size: 14px;
    }
  }

  .value-display {
    margin-top: 12px;
    padding: 8px 12px;
    background-color: #f9fafb;
    border-radius: 4px;
    font-size: 14px;
    color: #4b5563;
    display: flex;
    flex-direction: column;
    gap: 5px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    border-left: 3px solid #3b82f6;

    &.mini {
      margin-top: 8px;
      padding: 6px 10px;
      font-size: 12px;
      gap: 3px;
    }
  }

  // 轨道粗细样式
  .slider-track-thin {
    :deep(.t-slider__runway) {
      height: 4px;
    }
    :deep(.t-slider--vertical .t-slider__runway) {
      width: 4px;
      height: auto;
    }
  }

  .slider-track-medium {
    :deep(.t-slider__runway) {
      height: 6px;
    }
    :deep(.t-slider--vertical .t-slider__runway) {
      width: 6px;
      height: auto;
    }
  }

  .slider-track-thick {
    :deep(.t-slider__runway) {
      height: 8px;
    }
    :deep(.t-slider--vertical .t-slider__runway) {
      width: 8px;
      height: auto;
    }
  }

  // 垂直模式测试容器
  .vertical-test-container {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    margin-bottom: 16px;

    .vertical-test-item {
      flex: 1;
      min-width: 150px;
      display: flex;
      flex-direction: column;
      align-items: center;

      h4 {
        margin-bottom: 12px;
        font-size: 14px;
        font-weight: 500;
        color: #374151;
      }

      .vertical-slider {
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 12px;
      }
    }
  }

  // 滑块与数字输入框结合的样式
  .slider-input-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;

    .slider-wrapper {
      flex: 1;
      min-width: 200px;
    }

    .input-number-wrapper {
      width: 120px;
    }

    .range-input-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;

      span {
        font-size: 14px;
        color: #4b5563;
      }

      :deep(.t-input-number) {
        width: 80px;
      }
    }
  }

  :deep(.test-section) {
    .test-section-content {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
  }

  // 自定义按钮样式
  .custom-slider-demo {
    margin-bottom: 20px;
    h4 {
      margin-bottom: 12px;
      font-size: 14px;
      font-weight: 500;
      color: #374151;
    }
  }

  .custom-button {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #fff;
    border: 2px solid #409eff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    color: #409eff;

    &.is-dragging {
      transform: scale(1.2);
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
    }

    &.min-button {
      background-color: #e6f7ff;
    }

    &.max-button {
      background-color: #f0f9eb;
    }
  }
}
</style>
