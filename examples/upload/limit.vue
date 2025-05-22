<template>
  <div class="upload-demo">
    <div class="limit-item">
      <h4>文件类型限制 (accept)</h4>
      <t-upload action="http://rap2api.taobao.org/app/mock/322878/upload" accept="image/*">
        <t-button type="primary">仅图片格式</t-button>
        <template #tip>
          <div class="upload-tip">只能上传jpg、png、gif等图片格式</div>
        </template>
      </t-upload>
    </div>

    <div class="limit-item">
      <h4>文件大小限制 (max-size)</h4>
      <t-upload action="http://rap2api.taobao.org/app/mock/322878/upload" :max-size="2" @exceed-size="handleExceedSize">
        <t-button type="primary">限制2MB</t-button>
        <template #tip>
          <div class="upload-tip">单个文件大小不能超过2MB</div>
        </template>
      </t-upload>
    </div>

    <div class="limit-item">
      <h4>数量限制 (limit)</h4>
      <t-upload action="http://rap2api.taobao.org/app/mock/322878/upload" :limit="3" multiple @exceed="handleExceed">
        <t-button type="primary">最多3个文件</t-button>
        <template #tip>
          <div class="upload-tip">最多上传3个文件</div>
        </template>
      </t-upload>
    </div>
  </div>
</template>

<script setup>


const handleExceedSize = file => {
  alert(`文件 ${file.name} 超过2MB限制`);
};

const handleExceed = files => {
  alert(`最多只能上传3个文件，本次选择了${files.length}个文件`);
};
</script>

<style scoped>
.upload-demo {
  width: 100%;
}

.limit-item {
  margin-bottom: 20px;
}

h4 {
  margin: 0 0 8px;
  font-weight: 500;
}

.upload-tip {
  margin-top: 8px;
  font-size: 12px;
  color: #606266;
}
</style>
