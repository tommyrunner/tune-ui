<template>
  <div class="dialog-demo">
    <div class="button-group">
      <t-button type="primary" @click="openDialog(true)">可拖拽对话框</t-button>
      <t-button type="info" @click="openDialog(false)">普通对话框</t-button>
    </div>
    
    <t-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :draggable="isDraggable"
      width="500px"
      @drag-start="handleDragStart"
      @drag="handleDrag"
      @drag-end="handleDragEnd"
    >
      <div class="dialog-content">
        <p v-if="isDraggable">
          当前对话框是<strong>可拖拽的</strong>。您可以通过点击并拖动标题栏来移动对话框的位置。
        </p>
        <p v-else>
          当前对话框是<strong>不可拖拽的</strong>。对话框位置固定，无法移动。
        </p>
        <p>通过设置 <code>draggable</code> 属性为 <code>true</code> 可以启用对话框的拖拽功能。</p>
        <p>拖拽功能适用于需要灵活调整界面布局的场景，让用户能够根据自己的喜好调整对话框位置。</p>
        
        <div class="drag-events" v-if="isDraggable && dragEvents.length > 0">
          <h4>拖拽事件记录：</h4>
          <ul>
            <li v-for="(event, index) in dragEvents" :key="index">
              {{ event }}
            </li>
          </ul>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <t-button @click="dialogVisible = false">关闭</t-button>
        </div>
      </template>
    </t-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";


const dialogVisible = ref(false);
const isDraggable = ref(true);
const dragEvents = ref([]);

// 计算对话框标题
const dialogTitle = computed(() => {
  return isDraggable.value ? "可拖拽对话框 (拖动我)" : "普通对话框";
});

/**
 * 打开对话框
 * @param {boolean} draggable - 是否可拖拽
 */
const openDialog = (draggable) => {
  isDraggable.value = draggable;
  dragEvents.value = [];
  dialogVisible.value = true;
};

/**
 * 处理拖拽开始事件
 */
const handleDragStart = (event) => {
  dragEvents.value.push(`拖拽开始: x=${Math.round(event.x)}, y=${Math.round(event.y)}`);
  limitEventCount();
};

/**
 * 处理拖拽中事件
 */
const handleDrag = (event) => {
  // 只记录部分拖拽事件以避免过多信息
  if (dragEvents.value.length % 5 === 0) {
    dragEvents.value.push(`拖拽中: x=${Math.round(event.x)}, y=${Math.round(event.y)}`);
    limitEventCount();
  }
};

/**
 * 处理拖拽结束事件
 */
const handleDragEnd = (event) => {
  dragEvents.value.push(`拖拽结束: x=${Math.round(event.x)}, y=${Math.round(event.y)}`);
  limitEventCount();
};

/**
 * 限制事件记录数量
 */
const limitEventCount = () => {
  if (dragEvents.value.length > 5) {
    dragEvents.value = dragEvents.value.slice(-5);
  }
};
</script>

<style scoped>
.dialog-demo {
  padding: 16px 0;
}

.button-group {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.dialog-content {
  line-height: 1.6;
  color: #606266;
}

.dialog-content p {
  margin: 0 0 12px;
}

.dialog-content strong {
  color: #409eff;
}

.dialog-content code {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  color: #409eff;
  font-family: Consolas, Monaco, monospace;
}

.drag-events {
  margin-top: 20px;
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.drag-events h4 {
  margin: 0 0 8px;
  font-size: 14px;
  color: #606266;
}

.drag-events ul {
  margin: 0;
  padding-left: 20px;
  font-size: 13px;
  color: #909399;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style> 