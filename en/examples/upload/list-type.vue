<template>
  <div class="upload-demo">
    <h4>Text List (list-type="text")</h4>
    <t-upload action="http://rap2api.taobao.org/app/mock/322878/upload" list-type="text" :file-list="textFileList">
      <t-button type="primary">Upload File</t-button>
    </t-upload>

    <h4>Picture List (list-type="picture")</h4>
    <t-upload action="http://rap2api.taobao.org/app/mock/322878/upload" list-type="picture" :file-list="imageFileList">
      <t-button type="primary">Upload Image</t-button>
    </t-upload>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Text file list initial values
const textFileList = ref([
  {
    uid: "1",
    name: "document1.docx",
    status: "success",
    size: 1024
  },
  {
    uid: "2",
    name: "document2.xlsx",
    status: "success",
    size: 2048
  }
]);

// Image file list initial values
const imageFileList = ref([
  {
    uid: "1",
    name: "image1.jpg",
    status: "success",
    url: "https://i.postimg.cc/C5k7W9GK/1.webp"
  },
  {
    uid: "2",
    name: "image2.png",
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
