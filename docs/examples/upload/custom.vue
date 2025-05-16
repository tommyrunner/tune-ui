<template>
  <div class="upload-demo">
    <h4>自定义上传实现 (http-request)</h4>
    <t-upload action="http://rap2api.taobao.org/app/mock/322878/upload" :http-request="customUpload">
      <t-button type="primary">自定义上传</t-button>
      <template #tip>
        <div class="upload-tip">通过自定义uploadRequest方法实现上传逻辑</div>
      </template>
    </t-upload>

    <h4>自定义附加数据 (data)</h4>
    <t-upload action="http://rap2api.taobao.org/app/mock/322878/upload" :data="{ type: 'custom', userId: 123 }">
      <t-button type="primary">附加数据</t-button>
      <template #tip>
        <div class="upload-tip">上传时会附加额外的参数</div>
      </template>
    </t-upload>
  </div>
</template>

<script setup>
import { TUpload, TButton } from "tune-ui";

// 自定义上传实现
const customUpload = async options => {
  const { file, onProgress, onSuccess, onError } = options;

  try {
    // 模拟上传进度
    for (let percent = 0; percent <= 100; percent += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      onProgress(percent);
    }

    // 模拟上传成功
    setTimeout(() => {
      onSuccess({
        url: URL.createObjectURL(file),
        name: file.name,
        status: "success"
      });
    }, 500);
  } catch (error) {
    onError(error);
  }
};
</script>

<style scoped>
.upload-demo {
  width: 100%;
}

h4 {
  margin: 16px 0 8px;
  font-weight: 500;
}

.upload-tip {
  margin-top: 8px;
  font-size: 12px;
  color: #606266;
}
</style>
