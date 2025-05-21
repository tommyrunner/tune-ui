<template>
  <div class="upload-demo">
    <h4>文本列表 (list-type="text")</h4>
    <t-upload action="http://rap2api.taobao.org/app/mock/322878/upload" list-type="text" :file-list="textFileList">
      <t-button type="primary">上传文件</t-button>
    </t-upload>

    <h4>图片列表 (list-type="picture")</h4>
    <t-upload action="http://rap2api.taobao.org/app/mock/322878/upload" list-type="picture" :file-list="imageFileList">
      <t-button type="primary">上传图片</t-button>
    </t-upload>
  </div>
</template>

<script setup>
import { ref } from "vue";


// 文本文件列表初始值
const textFileList = ref([
  {
    uid: "1",
    name: "文档1.docx",
    status: "success",
    size: 1024
  },
  {
    uid: "2",
    name: "文档2.xlsx",
    status: "success",
    size: 2048
  }
]);

// 图片文件列表初始值
const imageFileList = ref([
  {
    uid: "1",
    name: "图片1.jpg",
    status: "success",
    url: "https://i.postimg.cc/C5k7W9GK/1.webp"
  },
  {
    uid: "2",
    name: "图片2.png",
    status: "success",
    url: "https://i.postimg.cc/43y5JY6q/8.webp"
  }
]);
</script>

<style scoped>
.upload-demo {
  width: 100%;
}

h4 {
  margin: 16px 0 8px;
  font-weight: 500;
}
</style>
