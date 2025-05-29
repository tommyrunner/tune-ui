<template>
  <div class="collapse-demo">
    <h4>Nested Collapse Panels</h4>
    <t-collapse-group v-model="activeNames">
      <t-collapse title="System Settings" value="1">
        <div class="collapse-content">
          <p>Content area for main system settings.</p>

          <!-- Nested collapse panels -->
          <t-collapse-group v-model="nestedActive" class="nested-collapse">
            <t-collapse title="User Management" value="1-1">
              <div class="collapse-content">User management settings, including user permissions, role assignments and other functions.</div>
            </t-collapse>
            <t-collapse title="Security Settings" value="1-2">
              <div class="collapse-content">Security-related settings, such as password policies, login protection, access control, etc.</div>
            </t-collapse>
          </t-collapse-group>
        </div>
      </t-collapse>

      <t-collapse title="Content Management" value="2">
        <div class="collapse-content">
          <p>Content management system settings.</p>

          <!-- Nested collapse panels -->
          <t-collapse-group v-model="nestedActive2" class="nested-collapse">
            <t-collapse title="Article Management" value="2-1">
              <div class="collapse-content">Article management functions, responsible for content editing, publishing and archiving.</div>
            </t-collapse>
            <t-collapse title="Comment Settings" value="2-2">
              <div class="collapse-content">
                Manage user comment review rules and display methods.

                <!-- Third level nesting -->
                <t-collapse-group v-model="thirdLevelActive" class="third-level-collapse">
                  <t-collapse title="Review Rules" value="2-2-1">
                    <div class="collapse-content">Configure automated rules for comment review and manual review processes.</div>
                  </t-collapse>
                  <t-collapse title="Spam Comment Filtering" value="2-2-2">
                    <div class="collapse-content">Set up spam comment identification rules and handling methods.</div>
                  </t-collapse>
                </t-collapse-group>
              </div>
            </t-collapse>
          </t-collapse-group>
        </div>
      </t-collapse>
    </t-collapse-group>

    <div class="tip">
      Tip: By nesting collapse panels in the content area, you can achieve multi-level content organization, suitable for complex
      hierarchical structure display.
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activeNames = ref(["1"]);
const nestedActive = ref(["1-1"]);
const nestedActive2 = ref([]);
const thirdLevelActive = ref([]);
</script>

<style scoped>
.collapse-demo {
  padding: 16px 0;
}

h4 {
  margin: 0 0 16px;
  font-size: 16px;
  color: #606266;
}

.collapse-content {
  line-height: 1.6;
  color: #606266;
}

p {
  margin: 0 0 12px;
}

.nested-collapse {
  margin-top: 12px;
  margin-bottom: 12px;
}

.third-level-collapse {
  margin-top: 12px;
  margin-left: 12px;
  border-left: 2px solid #ebeef5;
  padding-left: 12px;
}

.tip {
  margin-top: 20px;
  padding: 12px;
  background-color: #f0f9eb;
  border-radius: 4px;
  font-size: 14px;
  color: #67c23a;
  line-height: 1.6;
}
</style>
