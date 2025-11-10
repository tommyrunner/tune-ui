<template>
  <div class="collapse-demo">
    <h4>嵌套折叠面板</h4>
    <t-collapse-group v-model="activeNames">
      <t-collapse title="系统设置" value="1">
        <div class="collapse-content">
          <p>主系统设置项的内容区域。</p>

          <!-- 嵌套的折叠面板 -->
          <t-collapse-group v-model="nestedActive" class="nested-collapse">
            <t-collapse title="用户管理" value="1-1">
              <div class="collapse-content">用户管理设置，包括用户权限、角色分配等功能。</div>
            </t-collapse>
            <t-collapse title="安全设置" value="1-2">
              <div class="collapse-content">安全相关的设置，如密码策略、登录保护、访问控制等。</div>
            </t-collapse>
          </t-collapse-group>
        </div>
      </t-collapse>

      <t-collapse title="内容管理" value="2">
        <div class="collapse-content">
          <p>内容管理系统设置项。</p>

          <!-- 嵌套的折叠面板 -->
          <t-collapse-group v-model="nestedActive2" class="nested-collapse">
            <t-collapse title="文章管理" value="2-1">
              <div class="collapse-content">文章管理功能，负责内容的编辑、发布和归档。</div>
            </t-collapse>
            <t-collapse title="评论设置" value="2-2">
              <div class="collapse-content">
                管理用户评论的审核规则和显示方式。

                <!-- 三级嵌套 -->
                <t-collapse-group v-model="thirdLevelActive" class="third-level-collapse">
                  <t-collapse title="审核规则" value="2-2-1">
                    <div class="collapse-content">配置评论审核的自动化规则和人工审核流程。</div>
                  </t-collapse>
                  <t-collapse title="垃圾评论过滤" value="2-2-2">
                    <div class="collapse-content">设置垃圾评论的识别规则和处理方式。</div>
                  </t-collapse>
                </t-collapse-group>
              </div>
            </t-collapse>
          </t-collapse-group>
        </div>
      </t-collapse>
    </t-collapse-group>

    <div class="tip">提示: 通过在内容区域中嵌套折叠面板，可以实现多层级的内容组织，适合复杂的层级结构展示。</div>
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
