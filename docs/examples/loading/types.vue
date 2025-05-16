<template>
  <div class="loading-example">
    <div class="loading-types">
      <div class="loading-card" v-loading="loading1" loading-type="spin">
        <div class="loading-content">
          <h3>Spin 类型</h3>
          <p>旋转动画类型</p>
        </div>
      </div>

      <div class="loading-card" v-loading="loading2" loading-type="bounce">
        <div class="loading-content">
          <h3>Bounce 类型</h3>
          <p>弹跳动画类型</p>
        </div>
      </div>
    </div>

    <div class="loading-actions">
      <t-button @click="toggleLoading('loading1')" type="primary">{{ loading1 ? "关闭" : "显示" }} Spin</t-button>
      <t-button @click="toggleLoading('loading2')" type="success">{{ loading2 ? "关闭" : "显示" }} Bounce</t-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TButton } from "tune-ui";

const loading1 = ref(false);
const loading2 = ref(false);

const toggleLoading = (type: "loading1" | "loading2") => {
  if (type === "loading1") {
    loading1.value = !loading1.value;
  } else {
    loading2.value = !loading2.value;
  }
};
</script>

<style scoped>
.loading-example {
  width: 100%;
}

.loading-types {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.loading-card {
  flex: 1;
  height: 200px;
  background-color: #f9fafb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-content {
  text-align: center;
  padding: 20px;
}

.loading-content h3 {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 500;
}

.loading-content p {
  color: #4b5563;
  font-size: 14px;
}

.loading-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}
</style>
