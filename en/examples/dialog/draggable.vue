<template>
  <div class="dialog-demo">
    <div class="button-group">
      <t-button type="primary" @click="openDialog(true)">Draggable Dialog</t-button>
      <t-button type="info" @click="openDialog(false)">Normal Dialog</t-button>
    </div>

    <t-dialog
      v-model="draggableDialogVisible"
      :title="dialogTitle"
      :draggable="isDraggable"
      width="500px"
      @drag-start="handleDragStart"
      @drag="handleDrag"
      @drag-end="handleDragEnd"
    >
      <div class="dialog-content">
        <p v-if="isDraggable">The current dialog is <strong>draggable</strong>. You can move the dialog position by clicking and dragging the title bar.</p>
        <p v-else>The current dialog is <strong>not draggable</strong>. The dialog position is fixed and cannot be moved.</p>
        <p>You can enable the dialog's drag functionality by setting the <code>draggable</code> property to <code>true</code>.</p>
        <p>The drag functionality is suitable for scenarios that require flexible interface layout adjustments, allowing users to adjust the dialog position according to their preferences.</p>

        <div class="drag-events" v-if="isDraggable && dragEvents.length > 0">
          <h4>Drag Event Log:</h4>
          <ul>
            <li v-for="(event, index) in dragEvents" :key="index">
              {{ event }}
            </li>
          </ul>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <t-button @click="draggableDialogVisible = false">Close</t-button>
        </div>
      </template>
    </t-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const draggableDialogVisible = ref(false);
const isDraggable = ref(true);
const dragEvents = ref([]);

// Calculate dialog title
const dialogTitle = computed(() => {
  return isDraggable.value ? "Draggable Dialog (Drag Me)" : "Normal Dialog";
});

/**
 * Open dialog
 * @param {boolean} draggable - Whether draggable
 */
const openDialog = draggable => {
  isDraggable.value = draggable;
  dragEvents.value = [];
  draggableDialogVisible.value = true;
};

/**
 * Handle drag start event
 */
const handleDragStart = event => {
  dragEvents.value.push(`Drag Start: x=${Math.round(event.x)}, y=${Math.round(event.y)}`);
  limitEventCount();
};

/**
 * Handle drag event
 */
const handleDrag = event => {
  // Only record some drag events to avoid too much information
  if (dragEvents.value.length % 5 === 0) {
    dragEvents.value.push(`Dragging: x=${Math.round(event.x)}, y=${Math.round(event.y)}`);
    limitEventCount();
  }
};

/**
 * Handle drag end event
 */
const handleDragEnd = event => {
  dragEvents.value.push(`Drag End: x=${Math.round(event.x)}, y=${Math.round(event.y)}`);
  limitEventCount();
};

/**
 * Limit event record count
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
