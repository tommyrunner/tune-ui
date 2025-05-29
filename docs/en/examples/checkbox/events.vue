<template>
  <div class="checkbox-demo">
    <div class="event-section">
      <h3>Single Checkbox Events</h3>
      <t-checkbox v-model="singleChecked" @change="handleSingleChange">Single Checkbox</t-checkbox>

      <div class="event-log">
        <div>Event Log:</div>
        <div v-for="(log, index) in singleLogs" :key="index" class="log-item">
          {{ log }}
        </div>
        <button class="clear-btn" @click="clearSingleLogs">Clear Log</button>
      </div>
    </div>

    <div class="event-section">
      <h3>Checkbox Group Events</h3>
      <t-checkbox-group v-model="groupChecked" @change="handleGroupChange">
        <t-checkbox value="option1">Option 1</t-checkbox>
        <t-checkbox value="option2">Option 2</t-checkbox>
        <t-checkbox value="option3">Option 3</t-checkbox>
      </t-checkbox-group>

      <div class="event-log">
        <div>Event Log:</div>
        <div v-for="(log, index) in groupLogs" :key="index" class="log-item">
          {{ log }}
        </div>
        <button class="clear-btn" @click="clearGroupLogs">Clear Log</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Single checkbox
const singleChecked = ref(false);
const singleLogs = ref([]);

const handleSingleChange = value => {
  singleLogs.value.unshift(`change event triggered: value is ${value}`);
  if (singleLogs.value.length > 5) {
    singleLogs.value.pop();
  }
};

const clearSingleLogs = () => {
  singleLogs.value = [];
};

// Checkbox group
const groupChecked = ref(["option1"]);
const groupLogs = ref([]);

const handleGroupChange = value => {
  groupLogs.value.unshift(`change event triggered: value is [${value.join(", ")}]`);
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
