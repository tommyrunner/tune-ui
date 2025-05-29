<template>
  <div class="demo-select">
    <div class="filter-example">
      <p class="filter-label">Local Filtering</p>
      <t-select v-model="value" :options="options" filterable placeholder="Type to filter options" />
    </div>

    <div class="filter-custom">
      <p class="filter-label">Custom Filter Method</p>
      <t-select
        v-model="customValue"
        :options="options"
        filterable
        :filter-method="customFilterMethod"
        placeholder="Custom filter (value + label)"
      />
    </div>

    <div class="filter-remote">
      <p class="filter-label">Remote Search</p>
      <t-select
        v-model="remoteValue"
        :options="remoteOptions"
        v-model:loading="loading"
        filterable
        :remote-method="remoteMethod"
        placeholder="Type keywords for remote search"
      />
      <div class="tip">Results will show after 1 second of typing</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref("");
const customValue = ref("");
const remoteValue = ref("");
const loading = ref(false);
const remoteOptions = ref([]);

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
  { label: "Watermelon", value: "watermelon" },
  { label: "Grape", value: "grape" },
  { label: "Strawberry", value: "strawberry" }
];

// Custom filter method
const customFilterMethod = (option, query) => {
  const text = query.toLowerCase();
  return option.label.toLowerCase().includes(text) || String(option.value).toLowerCase().includes(text);
};

// Remote search method
const remoteMethod = query => {
  if (query === "") {
    remoteOptions.value = [];
    return;
  }

  loading.value = true;
  // Simulate remote request
  setTimeout(() => {
    loading.value = false;
    remoteOptions.value = options.filter(item => item.label.toLowerCase().includes(query.toLowerCase()));
  }, 1000);
};
</script>

<style scoped>
.demo-select {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.filter-example,
.filter-custom,
.filter-remote {
  margin-bottom: 16px;
}

.filter-label {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 8px;
}

.tip {
  margin-top: 4px;
  font-size: 12px;
  color: #9ca3af;
}
</style>
