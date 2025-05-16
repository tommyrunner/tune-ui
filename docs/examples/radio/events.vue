<template>
  <div class="radio-demo">
    <div class="event-example">
      <p class="event-title">单选框事件:</p>
      <t-radio v-model="radioValue" :value="true" @change="handleRadioChange">单选框选项</t-radio>
    </div>

    <div class="event-example">
      <p class="event-title">单选框组事件:</p>
      <t-radio-group v-model="groupValue" @change="handleGroupChange">
        <t-radio value="A">选项A</t-radio>
        <t-radio value="B">选项B</t-radio>
        <t-radio value="C">选项C</t-radio>
      </t-radio-group>
    </div>

    <div class="event-log">
      <p class="log-title">事件记录:</p>
      <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TRadio, TRadioGroup } from "tune-ui";

const radioValue = ref(false);
const groupValue = ref("A");
const eventLogs = ref([]);

// 添加事件日志
const addLog = (source, value) => {
  const now = new Date();
  const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  eventLogs.value.unshift(`[${time}] ${source}: ${JSON.stringify(value)}`);

  // 限制日志数量
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};

// 处理单选框 change 事件
const handleRadioChange = value => {
  addLog("单选框变更", value);
};

// 处理单选框组 change 事件
const handleGroupChange = value => {
  addLog("单选框组变更", value);
};
</script>

<style scoped>
.radio-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.event-example {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.event-title {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin: 0 0 4px 0;
}

.event-log {
  margin-top: 8px;
  padding: 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
}

.log-title {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin: 0 0 8px 0;
}

.log-item {
  padding: 4px 0;
  font-size: 14px;
  color: #4b5563;
  font-family: monospace;
  border-bottom: 1px dashed #e5e7eb;
}

.log-item:last-child {
  border-bottom: none;
}
</style>
