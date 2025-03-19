<template>
  <div class="test-container">
    <h2>Upload 上传组件</h2>
    <p class="component-description">通过点击或拖拽上传文件。支持多种列表展示方式、自动上传、手动上传等功能。</p>

    <!-- 基础属性测试 -->
    <test-section title="基础属性">
      <p>测试上传组件的基础属性配置</p>

      <div class="test-grid">
        <!-- 禁用状态 -->
        <div class="test-item">
          <h4>禁用状态 (disabled)</h4>
          <t-upload :action="ACTION" disabled>
            <t-button type="primary">禁用状态</t-button>
          </t-upload>
        </div>

        <!-- 多选模式 -->
        <div class="test-item">
          <h4>多选模式 (multiple)</h4>
          <t-upload :action="ACTION" multiple>
            <t-button type="primary">多选上传</t-button>
          </t-upload>
        </div>

        <!-- 文件类型限制 -->
        <div class="test-item">
          <h4>文件类型限制 (accept)</h4>
          <t-upload :action="ACTION" accept="image/*">
            <t-button type="primary">仅图片</t-button>
          </t-upload>
        </div>

        <!-- 文件大小限制 -->
        <div class="test-item">
          <h4>文件大小限制 (maxSize)</h4>
          <t-upload :action="ACTION" :max-size="2">
            <t-button type="primary">限制2MB</t-button>
          </t-upload>
        </div>
      </div>
    </test-section>

    <!-- 列表类型测试 -->
    <test-section title="列表类型">
      <p>测试不同列表展示类型</p>

      <div class="test-grid">
        <!-- 文本列表 -->
        <div class="test-item">
          <h4>文本列表 (list-type="text")</h4>
          <t-upload :action="ACTION" list-type="text" :file-list="fileList">
            <t-button type="primary">文本列表</t-button>
          </t-upload>
        </div>

        <!-- 图片列表 -->
        <div class="test-item">
          <h4>图片列表 (list-type="picture")</h4>
          <t-upload :action="ACTION" list-type="picture" :file-list="imageFileList">
            <t-button type="primary">图片列表</t-button>
          </t-upload>
        </div>
      </div>
    </test-section>

    <!-- 拖拽上传测试 -->
    <test-section title="拖拽上传">
      <p>测试拖拽上传功能</p>

      <div class="test-grid">
        <!-- 基础拖拽 -->
        <div class="test-item">
          <h4>基础拖拽</h4>
          <t-upload :action="ACTION" drag>
            <div class="upload-dragger-content">
              <t-icon icon="upload" />
              <div>将文件拖到此处，或<em>点击上传</em></div>
            </div>
          </t-upload>
        </div>

        <!-- 禁用拖拽 -->
        <div class="test-item">
          <h4>禁用拖拽</h4>
          <t-upload :action="ACTION" drag disabled>
            <div class="upload-dragger-content">
              <t-icon icon="upload" />
              <div>禁用状态</div>
            </div>
          </t-upload>
        </div>
      </div>
    </test-section>

    <!-- 上传控制测试 -->
    <test-section title="上传控制">
      <p>测试上传控制相关功能</p>

      <div class="test-grid">
        <!-- 手动上传 -->
        <div class="test-item">
          <h4>手动上传 (auto-upload=false)</h4>
          <t-upload ref="manualUploadRef" :action="ACTION" :auto-upload="false">
            <t-button type="primary">选择文件</t-button>
          </t-upload>
          <div class="upload-buttons">
            <t-button type="success" @click="submitManualUpload">开始上传</t-button>
            <t-button type="info" @click="clearManualFiles">清空文件</t-button>
          </div>
        </div>

        <!-- 文件数量限制 -->
        <div class="test-item">
          <h4>文件数量限制 (limit)</h4>
          <t-upload :action="ACTION" :limit="3" @exceed="handleExceed">
            <t-button type="primary">限制3个文件</t-button>
            <template #tip>
              <div class="t-upload-tip">最多上传3个文件</div>
            </template>
          </t-upload>
        </div>
      </div>
    </test-section>

    <!-- 自定义上传测试 -->
    <test-section title="自定义上传">
      <p>测试自定义上传实现</p>

      <div class="test-grid">
        <!-- 自定义请求 -->
        <div class="test-item">
          <h4>自定义请求 (http-request)</h4>
          <t-upload :action="ACTION" :http-request="customUpload">
            <t-button type="primary">自定义上传</t-button>
          </t-upload>
        </div>

        <!-- 自定义数据 -->
        <div class="test-item">
          <h4>自定义数据 (data)</h4>
          <t-upload :action="ACTION" :data="{ type: 'test' }">
            <t-button type="primary">带额外数据</t-button>
          </t-upload>
        </div>

        <!-- 自定义请求头 -->
        <div class="test-item">
          <h4>自定义请求头 (headers)</h4>
          <t-upload :action="ACTION" :headers="{ 'X-Test': 'test' }">
            <t-button type="primary">自定义请求头</t-button>
          </t-upload>
        </div>
      </div>
    </test-section>

    <!-- 插槽测试 -->
    <test-section title="插槽">
      <p>测试所有可用插槽</p>

      <div class="test-grid">
        <!-- 触发按钮插槽 -->
        <div class="test-item">
          <h4>触发按钮插槽 (default)</h4>
          <t-upload :action="ACTION">
            <template #default>
              <t-button type="primary" icon="upload">自定义按钮</t-button>
            </template>
          </t-upload>
        </div>

        <!-- 拖拽区域插槽 -->
        <div class="test-item">
          <h4>拖拽区域插槽 (drag)</h4>
          <t-upload :action="ACTION" drag>
            <template #drag>
              <div class="custom-dragger">
                <t-icon icon="cloud-upload" />
                <div>自定义拖拽区域</div>
              </div>
            </template>
          </t-upload>
        </div>

        <!-- 文件列表项插槽 -->
        <div class="test-item">
          <h4>文件列表项插槽 (file-item)</h4>
          <t-upload :action="ACTION" :file-list="fileList">
            <template #file-item="{ file }">
              <div class="custom-file-item">
                <span>{{ file.name }}</span>
                &nbsp;
                <t-tag :type="file.status === 'success' ? 'success' : 'warning'" size="small">
                  {{ file.status }}
                </t-tag>
              </div>
            </template>
          </t-upload>
        </div>
      </div>
    </test-section>

    <!-- 事件处理测试 -->
    <test-section title="事件处理">
      <p>测试所有事件处理</p>

      <div class="test-grid">
        <!-- 上传成功事件 -->
        <div class="test-item">
          <h4>上传成功事件 (success)</h4>
          <t-upload :action="ACTION" @success="handleSuccess">
            <t-button type="primary">测试成功事件</t-button>
          </t-upload>
        </div>

        <!-- 上传失败事件 -->
        <div class="test-item">
          <h4>上传失败事件 (error)</h4>
          <t-upload :action="ACTION" @error="handleError">
            <t-button type="primary">测试失败事件</t-button>
          </t-upload>
        </div>

        <!-- 上传进度事件 -->
        <div class="test-item">
          <h4>上传进度事件 (progress)</h4>
          <t-upload :action="ACTION" @progress="handleProgress">
            <t-button type="primary">测试进度事件</t-button>
          </t-upload>
        </div>

        <!-- 文件状态改变事件 -->
        <div class="test-item">
          <h4>文件状态改变事件 (change)</h4>
          <t-upload :action="ACTION" @change="handleChange">
            <t-button type="primary">测试状态改变</t-button>
          </t-upload>
        </div>

        <!-- 文件移除事件 -->
        <div class="test-item">
          <h4>文件移除事件 (remove)</h4>
          <t-upload :action="ACTION" :file-list="fileList" @remove="handleRemove">
            <t-button type="primary">测试移除事件</t-button>
          </t-upload>
        </div>

        <!-- 文件预览事件 -->
        <div class="test-item">
          <h4>文件预览事件 (preview)</h4>
          <t-upload :action="ACTION" :file-list="imageFileList" @preview="handlePreview">
            <t-button type="primary">测试预览事件</t-button>
          </t-upload>
        </div>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TUpload } from "@/packages/upload";
import { TButton } from "@/packages/button";
import { TIcon } from "@/packages/icon";
import { TTag } from "@/packages/tag";
import TestSection from "../components/test-section.vue";
import type { UploadFile, UploadRequestOptions } from "@/packages/upload/upload";
import { TMessage } from "@/packages/message";

defineOptions({ name: "UploadTest" });

// 上传地址
const ACTION = "http://localhost:3000/upload";

// 文件列表
const fileList = ref<UploadFile[]>([
  {
    uid: "1",
    name: "文档1.docx",
    status: "success",
    size: 1024
  },
  {
    uid: "2",
    name: "文档2.xlsx",
    status: "uploading",
    size: 2048
  },
  {
    uid: "3",
    name: "文档3.pdf",
    status: "fail",
    error: new Error("上传失败"),
    size: 3072
  }
]);

// 图片文件列表
const imageFileList = ref<UploadFile[]>([
  {
    uid: "1",
    name: "图片1.jpg",
    status: "success",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg",
    type: "image/jpeg"
  },
  {
    uid: "2",
    name: "图片2.png",
    status: "success",
    url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    type: "image/png"
  }
]);

// 手动上传组件引用
const manualUploadRef = ref();

// 自定义上传实现
const customUpload = async (options: UploadRequestOptions) => {
  // 模拟上传过程
  const { file, onProgress, onSuccess, onError } = options;

  try {
    // 模拟进度
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      onProgress(i);
    }

    // 模拟成功
    onSuccess({
      url: URL.createObjectURL(file),
      name: file.name
    });
  } catch (error) {
    onError(error as Error);
  }
};

// 事件处理函数
const handleSuccess = (file: UploadFile, response: any) => {
  TMessage.success(`文件"${file.name}"上传成功`);
  console.log("上传成功:", file, response);
};

const handleError = (file: UploadFile, error: Error) => {
  TMessage.danger(`文件"${file.name}"上传失败`);
  console.log("上传失败:", file, error);
};

const handleProgress = (file: UploadFile, percent: number) => {
  console.log("上传进度:", file.name, percent);
};

const handleChange = (file: UploadFile | null, fileList: UploadFile[]) => {
  console.log("文件状态改变:", file, fileList);
};

const handleRemove = (file: UploadFile, fileList: UploadFile[]) => {
  TMessage.info(`文件"${file.name}"已移除`);
  console.log("文件移除:", file, fileList);
};

const handlePreview = (file: UploadFile) => {
  TMessage.info(`预览文件: ${file.name}`);
  console.log("文件预览:", file);
};

const handleExceed = (files: File[], fileList: UploadFile[]) => {
  TMessage.warning(`超出文件数量限制`);
  console.log("超出限制:", files, fileList);
};

// 手动上传控制
const submitManualUpload = () => {
  manualUploadRef.value?.submit();
};

const clearManualFiles = () => {
  manualUploadRef.value?.clearFiles();
};
</script>

<style lang="scss" scoped>
.test-container {
  padding: 24px;

  h2 {
    margin-bottom: 16px;
    font-weight: 600;
    font-size: 28px;
    color: #1f2937;
  }

  .component-description {
    margin-bottom: 24px;
    font-size: 16px;
    color: #4b5563;
    line-height: 1.6;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 16px;
  }

  h4 {
    margin-bottom: 12px;
    font-weight: 500;
    font-size: 16px;
    color: #374151;
  }

  .test-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    margin-bottom: 24px;
  }

  .test-item {
    padding: 16px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background-color: #fff;
  }

  .upload-dragger-content {
    padding: 30px 20px;
    text-align: center;

    .t-icon {
      font-size: 48px;
      color: #909399;
      margin-bottom: 12px;
    }

    div {
      color: #606266;
      font-size: 16px;

      em {
        color: #409eff;
        font-style: normal;
        font-weight: 500;
      }
    }
  }

  .custom-dragger {
    padding: 20px;
    text-align: center;
    background-color: #f9f9fb;
    border: 2px dashed #dcdfe6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      border-color: #409eff;
      background-color: rgba(64, 158, 255, 0.05);
    }

    .t-icon {
      font-size: 48px;
      color: #909399;
      margin-bottom: 12px;
    }

    div {
      color: #606266;
      font-size: 16px;
    }
  }

  .custom-file-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    background-color: #f9f9fb;
    border-radius: 4px;
  }

  .custom-tip {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #909399;
    font-size: 12px;
    margin-top: 8px;
  }

  .upload-buttons {
    display: flex;
    gap: 12px;
    margin-top: 16px;
  }
}
</style>
