<template>
  <div class="checkbox-demo">
    <div class="event-section">
      <h3>单个复选框事件</h3>
      <t-checkbox v-model="singleChecked" @change="handleSingleChange">单个复选框</t-checkbox>

      <div class="event-log">
        <div>事件日志：</div>
        <div v-for="(log, index) in singleLogs" :key="index" class="log-item">
          {{ log }}
        </div>
        <button class="clear-btn" @click="clearSingleLogs">清除日志</button>
      </div>
    </div>

    <div class="event-section">
      <h3>复选框组事件</h3>
      <t-checkbox-group v-model="groupChecked" @change="handleGroupChange">
        <t-checkbox value="option1">选项一</t-checkbox>
        <t-checkbox value="option2">选项二</t-checkbox>
        <t-checkbox value="option3">选项三</t-checkbox>
      </t-checkbox-group>

      <div class="event-log">
        <div>事件日志：</div>
        <div v-for="(log, index) in groupLogs" :key="index" class="log-item">
          {{ log }}
        </div>
        <button class="clear-btn" @click="clearGroupLogs">清除日志</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TCheckbox, TCheckboxGroup } from "tune-ui";

// 单个复选框
const singleChecked = ref(false);
const singleLogs = ref([]);

const handleSingleChange = value => {
  singleLogs.value.unshift(`change 事件触发：值为 ${value}`);
  if (singleLogs.value.length > 5) {
    singleLogs.value.pop();
  }
};

const clearSingleLogs = () => {
  singleLogs.value = [];
};

// 复选框组
const groupChecked = ref(["option1"]);
const groupLogs = ref([]);

const handleGroupChange = value => {
  groupLogs.value.unshift(`change 事件触发：值为 [${value.join(", ")}]`);
  if (groupLogs.value.length > 5) {
    groupLogs.value.pop();
  }
};

const clearGroupLogs = () => {
  groupLogs.value = [];
};
</script>

<style scoped>
.checkbox-demo {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.event-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.event-section h3 {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 8px 0;
}

.event-log {
  margin-top: 12px;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
}

.log-item {
  padding: 6px 0;
  border-bottom: 1px dashed #e0e0e0;
}

.log-item:last-child {
  border-bottom: none;
}

.clear-btn {
  margin-top: 8px;
  padding: 4px 8px;
  font-size: 12px;
  background-color: #f0f0f0;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
}

.clear-btn:hover {
  background-color: #e6e6e6;
}
</style>
