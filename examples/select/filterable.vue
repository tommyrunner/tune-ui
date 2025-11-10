<template>
  <div class="demo-select">
    <div class="filter-example">
      <p class="filter-label">本地过滤</p>
      <t-select v-model="value" :options="options" filterable placeholder="输入内容过滤选项" />
    </div>

    <div class="filter-custom">
      <p class="filter-label">自定义过滤方法</p>
      <t-select
        v-model="customValue"
        :options="options"
        filterable
        :filter-method="customFilterMethod"
        placeholder="自定义过滤(值+标签)"
      />
    </div>

    <div class="filter-remote">
      <p class="filter-label">远程搜索</p>
      <t-select
        v-model="remoteValue"
        :options="remoteOptions"
        v-model:loading="loading"
        filterable
        :remote-method="remoteMethod"
        placeholder="输入关键字远程搜索"
      />
      <div class="tip">输入关键字后等待1秒显示结果</div>
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
  { label: "苹果", value: "apple" },
  { label: "香蕉", value: "banana" },
  { label: "橙子", value: "orange" },
  { label: "西瓜", value: "watermelon" },
  { label: "葡萄", value: "grape" },
  { label: "草莓", value: "strawberry" }
];

// 自定义过滤方法
const customFilterMethod = (option, query) => {
  const text = query.toLowerCase();
  return option.label.toLowerCase().includes(text) || String(option.value).toLowerCase().includes(text);
};

// 远程搜索方法
const remoteMethod = query => {
  if (query === "") {
    remoteOptions.value = [];
    return;
  }

  loading.value = true;
  // 模拟远程请求
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
