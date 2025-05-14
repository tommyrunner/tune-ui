<template>
  <div class="input-demo">
    <t-input
      v-model="inputValue"
      clearable
      placeholder="尝试输入、清除和按Enter键"
      @focus="handleFocus"
      @blur="handleBlur"
      @enter="handleEnter"
      @input="handleInput"
      @clear="handleClear"
    />
    <div class="event-log">
      <div class="event-title">事件记录:</div>
      <div v-for="(event, index) in eventLogs" :key="index" class="event-item">
        {{ event }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TInput } from "tune-ui";

const inputValue = ref("");
const eventLogs = ref([]);

const handleFocus = value => {
  eventLogs.value.unshift(`获得焦点: ${value}`);
};

const handleBlur = value => {
  eventLogs.value.unshift(`失去焦点: ${value}`);
};

const handleEnter = value => {
  eventLogs.value.unshift(`按下回车: ${value}`);
};

const handleInput = value => {
  eventLogs.value.unshift(`输入值: ${value}`);
  // 只保留最近5条记录
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop();
  }
};

const handleClear = () => {
  eventLogs.value.unshift("清除内容");
};
</script>

<style scoped>
.input-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.t-input {
  width: 240px;
}

.event-log {
  margin-top: 16px;
  padding: 16px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.event-title {
  margin-bottom: 12px;
  font-weight: 600;
  color: #374151;
}

.event-item {
  padding: 6px 8px;
  margin-bottom: 4px;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-family: ui-monospace, monospace;
  font-size: 13px;
  color: #4b5563;
}
</style>
