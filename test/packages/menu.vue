<template>
  <div class="test-container">
    <h2>Menu 菜单组件</h2>

    <!-- 基础菜单 -->
    <test-section title="基础菜单">
      <div class="test-menu-container">
        <t-menu :data="menuData" active="dashboard" :expand-keys="['user']" />
      </div>
    </test-section>

    <!-- 多级嵌套菜单 -->
    <test-section title="多级嵌套菜单">
      <div class="test-menu-container">
        <t-menu :data="menuData" active="userPassword" :expand-keys="['user', 'userList']" />
      </div>
    </test-section>

    <!-- 模式切换测试 -->
    <test-section title="菜单模式切换">
      <div class="mode-switch-container">
        <div class="mode-switch">
          <div class="mode-switch__options">
            <span class="mode-switch__title">菜单模式：</span>
            <t-radio-group v-model="currentMode" type="button">
              <t-radio v-for="mode in modes" :key="mode.value" :value="mode.value">{{ mode.label }}</t-radio>
            </t-radio-group>
          </div>
        </div>

        <div class="test-menu-container">
          <t-menu :data="menuData" active="dashboard" :expand-keys="['user']" :mode="currentMode" />
        </div>
      </div>
    </test-section>

    <!-- 手风琴模式 -->
    <test-section title="手风琴模式">
      <div class="test-accordion">
        <div class="test-accordion__description">
          <p>手风琴模式特点：</p>
          <ul>
            <li>同级菜单互斥，只能展开一个</li>
            <li>可以同时展开多个不同级别菜单</li>
            <li>点击子菜单不会收起父级菜单</li>
          </ul>
        </div>
        <div class="test-menu-container">
          <t-menu :data="accordionData" v-model:active="accordionActive" v-model:expand-keys="accordionExpandKeys" accordion />
        </div>
        <div class="test-accordion__info">
          <div class="info-item">
            <span class="info-label">当前选中：</span>
            <span class="info-value">{{ accordionActive }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">展开状态：</span>
            <span class="info-value">{{ accordionExpandKeys.join(", ") }}</span>
          </div>
        </div>
      </div>
    </test-section>

    <!-- 自动展开所有子节点 -->
    <test-section title="自动展开所有子节点">
      <div class="test-menu-container">
        <t-menu :data="testData" :auto-expand="true" />
        <div class="test-description">
          <p>自动展开所有子节点功能：点击一个有子菜单的项目时，会自动展开它所有的子节点。</p>
        </div>
      </div>
    </test-section>

    <!-- 使用组合方式创建菜单 -->
    <test-section title="使用组合方式创建菜单">
      <div class="test-menu-container">
        <t-menu>
          <t-menu-group title="系统管理">
            <t-menu-item :menu-item="{ id: 'dashboard', title: '控制台', icon: 'home' }" />
            <t-menu-item
              :menu-item="{
                id: 'settings',
                title: '系统设置',
                icon: 'seting',
                children: [
                  { id: 'general', title: '常规设置', icon: 'file' },
                  { id: 'security', title: '安全设置', icon: 'lock' }
                ]
              }"
            />
          </t-menu-group>

          <t-menu-group title="内容管理">
            <t-menu-item :menu-item="{ id: 'articles', title: '文章管理', icon: 'file' }" />
            <t-menu-item
              :menu-item="{
                id: 'media',
                title: '媒体库',
                icon: 'file',
                children: [
                  { id: 'images', title: '图片管理', icon: 'image' },
                  { id: 'videos', title: '视频管理', icon: 'file-gif' }
                ]
              }"
            />
          </t-menu-group>

          <t-menu-group title="用户管理">
            <t-menu-item :menu-item="{ id: 'userList', title: '用户列表', icon: 'user' }" />
            <t-menu-item :menu-item="{ id: 'userRole', title: '角色管理', icon: 'user' }" />
          </t-menu-group>
        </t-menu>
      </div>
      <div class="test-description">
        <p>组合方式创建菜单允许更灵活地组织菜单结构，可以使用 TMenuGroup 创建分组，使用 TMenuItem 创建菜单项。</p>
        <p>每个 TMenuItem 需要提供 menu-item 属性，可以包含子菜单项。</p>
      </div>
    </test-section>

    <!-- 弹出菜单触发方式 -->
    <test-section title="弹出菜单触发方式">
      <div class="test-menu-mode">
        <div class="menu-mode-item">
          <div class="mode-title">悬停触发 (hover)</div>
          <div class="test-menu-container">
            <t-menu :data="testData" mode="collapse" popover-type="hover" />
          </div>
        </div>

        <div class="menu-mode-item">
          <div class="mode-title">点击触发 (click)</div>
          <div class="test-menu-container">
            <t-menu :data="testData" mode="collapse" popover-type="click" />
          </div>
        </div>
      </div>
      <div class="test-description">
        <p>通过 popover-type 属性可以设置折叠模式下弹出菜单的触发方式，支持 hover 和 click 两种模式。</p>
      </div>
    </test-section>

    <!-- 弹出层宽度设置 -->
    <test-section title="弹出层宽度设置">
      <div class="test-menu-mode">
        <div class="menu-mode-item">
          <div class="mode-title">默认宽度 (180px)</div>
          <div class="test-menu-container">
            <t-menu :data="testData" mode="collapse" />
          </div>
        </div>

        <div class="menu-mode-item">
          <div class="mode-title">自定义宽度 (260px)</div>
          <div class="test-menu-container">
            <t-menu :data="testData" mode="collapse" :popover-width="260" />
          </div>
        </div>
      </div>
      <div class="test-description">
        <p>通过 popover-width 属性可以设置折叠模式下弹出菜单的宽度，支持数字和字符串格式，默认为180px。</p>
      </div>
    </test-section>

    <!-- 菜单实际应用场景预览 -->
    <test-section title="菜单实际应用场景预览">
      <div class="preview-header">
        <div class="preview-title">实际应用场景</div>
        <div class="preview-controls">
          <t-button type="primary" size="small" @click="previewMenuMode = previewMenuMode === 'expand' ? 'collapse' : 'expand'">
            {{ previewMenuMode === "expand" ? "折叠菜单" : "展开菜单" }}
          </t-button>
        </div>
      </div>
      <div class="menu-application-preview">
        <div class="menu-sidebar" :class="{ collapsed: previewMenuMode === 'collapse' }">
          <div class="app-header">
            <div class="app-logo">
              <t-icon icon="home" :size="24" />
              <span class="app-name" v-show="previewMenuMode === 'expand'">TUI Admin</span>
            </div>
          </div>
          <t-menu v-model:active="activeRoute" :data="applicationMenuData" :auto-expand="true" :mode="previewMenuMode" />
        </div>
        <div class="menu-content">
          <div class="app-header">
            <t-breadcrumb :options="getBreadcrumbData()" :gap="8" />
            <div class="user-info">
              <span class="user-name">Admin</span>
              <t-icon icon="user" :size="20" />
            </div>
          </div>
          <div class="route-container">
            <div class="route-info">
              <h3>当前路由信息</h3>
              <div class="route-details">
                <div class="route-item">
                  <span class="route-label">路由名称：</span>
                  <span class="route-value">{{ getRouteInfo().name }}</span>
                </div>
                <div class="route-item">
                  <span class="route-label">路由路径：</span>
                  <span class="route-value">{{ getRouteInfo().path }}</span>
                </div>
                <div class="route-item">
                  <span class="route-label">分类：</span>
                  <span class="route-value">{{ getRouteInfo().category }}</span>
                </div>
                <div class="route-item">
                  <span class="route-label">组件：</span>
                  <span class="route-value">{{ getRouteInfo().component }}</span>
                </div>
              </div>
            </div>
            <div class="route-content">
              <div class="route-content-inner">
                <p>
                  这里是 <strong>{{ getRouteInfo().name }}</strong> 页面的内容
                </p>
                <p>{{ getRouteInfo().description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import type { MenuItemType, ModeType } from "@/packages/menu/menu";
import type { ValueType as BreadcrumbItemType } from "@/packages/breadcrumb/breadcrumb";
import { ref } from "vue";
import TestSection from "../components/test-section.vue";
import { TMenu, TMenuGroup, TMenuItem } from "@/packages/menu";
import { TBreadcrumb } from "@/packages/breadcrumb";
import { TButton } from "@/packages/button";
import { TIcon } from "@/packages/icon";
import { TRadio, TRadioGroup } from "@/packages/radio";

defineOptions({
  name: "MenuTest"
});

// 菜单模式选项
const modes = [
  { label: "展开模式", value: "expand" },
  { label: "折叠模式", value: "collapse" }
];

// 当前菜单模式
const currentMode = ref<ModeType>("expand");

// 应用场景中当前选中的路由
const activeRoute = ref<string>("dashboard");

// 手风琴模式状态
const accordionActive = ref<string>("menu1-1");
const accordionExpandKeys = ref<string[]>(["menu1", "menu1-sub1"]);

// 手风琴模式测试数据
const accordionData = ref<MenuItemType[]>([
  {
    id: "menu1",
    title: "菜单组 1",
    icon: "file",
    children: [
      {
        id: "menu1-1",
        title: "选项 1-1",
        icon: "file"
      },
      {
        id: "menu1-sub1",
        title: "子菜单 1-1",
        icon: "menu-to",
        children: [
          {
            id: "menu1-sub1-1",
            title: "选项 1-1-1",
            icon: "file"
          },
          {
            id: "menu1-sub1-2",
            title: "选项 1-1-2",
            icon: "file"
          }
        ]
      },
      {
        id: "menu1-2",
        title: "选项 1-2",
        icon: "file"
      }
    ]
  },
  {
    id: "menu2",
    title: "菜单组 2",
    icon: "file",
    children: [
      {
        id: "menu2-1",
        title: "选项 2-1",
        icon: "file"
      },
      {
        id: "menu2-2",
        title: "选项 2-2",
        icon: "file"
      }
    ]
  }
]);

// 测试数据 - 包含更深层次嵌套的测试数据
const testData = ref<MenuItemType[]>([
  {
    id: "dashboard",
    title: "控制台",
    icon: "home"
  },
  {
    id: "complex",
    title: "多级菜单",
    icon: "menu-to",
    children: [
      {
        id: "level1",
        title: "一级菜单",
        icon: "menu-to",
        children: [
          {
            id: "level2-1",
            title: "二级菜单-1",
            icon: "file",
            children: [
              {
                id: "level3-1",
                title: "三级菜单-1",
                icon: "file"
              },
              {
                id: "level3-2",
                title: "三级菜单-2",
                icon: "file"
              }
            ]
          },
          {
            id: "level2-2",
            title: "二级菜单-2",
            icon: "file"
          }
        ]
      },
      {
        id: "simple",
        title: "普通菜单",
        icon: "file"
      }
    ]
  },
  {
    id: "settings",
    title: "系统设置",
    icon: "seting",
    children: [
      {
        id: "profile",
        title: "个人设置",
        icon: "user"
      },
      {
        id: "system",
        title: "系统配置",
        icon: "seting"
      }
    ]
  }
]);

// 菜单测试数据
const menuData = ref<MenuItemType[]>([
  {
    id: "dashboard",
    title: "控制台",
    icon: "home"
  },
  {
    id: "user",
    title: "用户管理",
    icon: "user",
    children: [
      {
        id: "userList",
        title: "用户列表",
        icon: "file",
        children: [
          {
            id: "userPassword",
            title: "用户密码",
            icon: "lock"
          }
        ]
      },
      {
        id: "userRole",
        title: "角色管理",
        icon: "user"
      }
    ]
  },
  {
    id: "charts",
    title: "数据图表",
    icon: "file",
    children: [
      {
        id: "barChart",
        title: "柱状图",
        icon: "file"
      },
      {
        id: "lineChart",
        title: "折线图",
        icon: "file"
      },
      {
        id: "pieChart",
        title: "饼图",
        icon: "file"
      }
    ]
  },
  {
    id: "settings",
    title: "系统设置",
    icon: "seting",
    disabled: true,
    children: [
      {
        id: "globalSettings",
        title: "全局设置",
        icon: "seting"
      },
      {
        id: "security",
        title: "安全设置",
        icon: "lock"
      }
    ]
  }
]);

// 预览模式
const previewMenuMode = ref<ModeType>("expand");

// 应用场景预览的菜单数据
const applicationMenuData = ref<MenuItemType[]>([
  {
    id: "dashboard",
    title: "工作台",
    icon: "home"
  },
  {
    id: "system",
    title: "系统管理",
    icon: "seting",
    children: [
      {
        id: "users",
        title: "用户管理",
        icon: "user",
        children: [
          {
            id: "user-list",
            title: "用户列表",
            icon: "file"
          },
          {
            id: "user-group",
            title: "用户分组",
            icon: "user"
          }
        ]
      },
      {
        id: "roles",
        title: "角色权限",
        icon: "lock",
        children: [
          {
            id: "role-list",
            title: "角色列表",
            icon: "file"
          },
          {
            id: "permission-assign",
            title: "权限分配",
            icon: "lock"
          }
        ]
      },
      {
        id: "menus",
        title: "菜单管理",
        icon: "menu-to"
      }
    ]
  },
  {
    id: "content",
    title: "内容管理",
    icon: "file",
    children: [
      {
        id: "articles",
        title: "文章管理",
        icon: "file",
        children: [
          {
            id: "article-list",
            title: "文章列表",
            icon: "file"
          },
          {
            id: "article-editor",
            title: "文章编辑器",
            icon: "edit"
          },
          {
            id: "article-recycle",
            title: "回收站",
            icon: "delete"
          }
        ]
      },
      {
        id: "categories",
        title: "分类管理",
        icon: "file"
      },
      {
        id: "tags",
        title: "标签管理",
        icon: "file"
      },
      {
        id: "comments",
        title: "评论管理",
        icon: "file"
      }
    ]
  },
  {
    id: "data",
    title: "数据分析",
    icon: "home",
    children: [
      {
        id: "overview",
        title: "数据概览",
        icon: "home"
      },
      {
        id: "visitors",
        title: "访问统计",
        icon: "user"
      },
      {
        id: "traffic",
        title: "流量分析",
        icon: "home"
      }
    ]
  },
  {
    id: "marketing",
    title: "营销中心",
    icon: "home",
    children: [
      {
        id: "campaigns",
        title: "活动管理",
        icon: "home"
      },
      {
        id: "coupons",
        title: "优惠券",
        icon: "home"
      }
    ]
  },
  {
    id: "personal",
    title: "个人中心",
    icon: "user",
    children: [
      {
        id: "profile",
        title: "个人资料",
        icon: "user"
      },
      {
        id: "messages",
        title: "消息中心",
        icon: "mail"
      },
      {
        id: "settings",
        title: "账号设置",
        icon: "home"
      }
    ]
  }
]);

// 路由信息映射接口
interface RouteInfoType {
  name: string;
  path: string;
  component: string;
  category: string;
  description: string;
}

// 路由信息映射
const routeInfoMap: Record<string, RouteInfoType> = {
  dashboard: {
    name: "工作台",
    path: "/dashboard",
    component: "Dashboard.vue",
    category: "系统",
    description: "展示系统整体运行状态和关键业务指标的控制台页面。"
  },
  users: {
    name: "用户管理",
    path: "/system/users",
    component: "UserManagement.vue",
    category: "系统管理",
    description: "管理系统中的所有用户账号，包括创建、编辑、删除和查询用户信息。"
  },
  "user-list": {
    name: "用户列表",
    path: "/system/users/list",
    component: "UserList.vue",
    category: "系统管理/用户管理",
    description: "查看和管理所有系统用户，支持筛选、排序和批量操作。"
  },
  "user-group": {
    name: "用户分组",
    path: "/system/users/group",
    component: "UserGroup.vue",
    category: "系统管理/用户管理",
    description: "管理用户分组，为不同用户组分配不同的权限和资源。"
  },
  roles: {
    name: "角色权限",
    path: "/system/roles",
    component: "RolePermission.vue",
    category: "系统管理",
    description: "设置和管理系统中的角色类型及对应的权限，支持细粒度权限控制。"
  },
  "role-list": {
    name: "角色列表",
    path: "/system/roles/list",
    component: "RoleList.vue",
    category: "系统管理/角色权限",
    description: "查看和管理所有角色，设置角色的基本信息和继承关系。"
  },
  "permission-assign": {
    name: "权限分配",
    path: "/system/roles/permissions",
    component: "PermissionAssign.vue",
    category: "系统管理/角色权限",
    description: "为角色分配具体权限，支持功能权限和数据权限的精细化配置。"
  },
  menus: {
    name: "菜单管理",
    path: "/system/menus",
    component: "MenuManagement.vue",
    category: "系统管理",
    description: "配置系统菜单结构和层级关系，支持自定义菜单项和权限绑定。"
  },
  articles: {
    name: "文章管理",
    path: "/content/articles",
    component: "ArticleManagement.vue",
    category: "内容管理",
    description: "管理网站内容中的文章，支持文章的创建、编辑、发布和删除等操作。"
  },
  "article-list": {
    name: "文章列表",
    path: "/content/articles/list",
    component: "ArticleList.vue",
    category: "内容管理/文章管理",
    description: "查看所有文章，支持按状态、分类、标签等多维度筛选和管理。"
  },
  "article-editor": {
    name: "文章编辑器",
    path: "/content/articles/editor",
    component: "ArticleEditor.vue",
    category: "内容管理/文章管理",
    description: "强大的富文本编辑器，支持多种格式内容编辑、图片上传和排版设置。"
  },
  "article-recycle": {
    name: "回收站",
    path: "/content/articles/recycle",
    component: "ArticleRecycle.vue",
    category: "内容管理/文章管理",
    description: "管理已删除的文章，支持恢复或永久删除操作。"
  },
  categories: {
    name: "分类管理",
    path: "/content/categories",
    component: "CategoryManagement.vue",
    category: "内容管理",
    description: "管理文章的分类结构，支持多级分类和分类关联。"
  },
  tags: {
    name: "标签管理",
    path: "/content/tags",
    component: "TagManagement.vue",
    category: "内容管理",
    description: "管理文章标签，支持标签的创建、编辑和删除，以及标签与文章的关联。"
  },
  comments: {
    name: "评论管理",
    path: "/content/comments",
    component: "CommentManagement.vue",
    category: "内容管理",
    description: "审核和管理用户评论，支持评论的审核、回复和删除等操作。"
  },
  overview: {
    name: "数据概览",
    path: "/data/overview",
    component: "DataOverview.vue",
    category: "数据分析",
    description: "展示网站整体运营数据和关键业务指标，包括访问量、用户增长等。"
  },
  visitors: {
    name: "访问统计",
    path: "/data/visitors",
    component: "VisitorStatistics.vue",
    category: "数据分析",
    description: "分析用户访问行为和访问来源，支持多维度数据筛选和图表展示。"
  },
  traffic: {
    name: "流量分析",
    path: "/data/traffic",
    component: "TrafficAnalysis.vue",
    category: "数据分析",
    description: "分析网站流量来源和用户行为路径，帮助优化网站结构和内容。"
  },
  campaigns: {
    name: "活动管理",
    path: "/marketing/campaigns",
    component: "CampaignManagement.vue",
    category: "营销中心",
    description: "管理营销活动，包括活动创建、编辑、上下线和效果分析。"
  },
  coupons: {
    name: "优惠券",
    path: "/marketing/coupons",
    component: "CouponManagement.vue",
    category: "营销中心",
    description: "管理系统优惠券，包括优惠券的创建、发放和核销等操作。"
  },
  profile: {
    name: "个人资料",
    path: "/personal/profile",
    component: "UserProfile.vue",
    category: "个人中心",
    description: "查看和编辑个人基本信息，包括头像、昵称和联系方式等。"
  },
  messages: {
    name: "消息中心",
    path: "/personal/messages",
    component: "MessageCenter.vue",
    category: "个人中心",
    description: "查看和管理系统通知、私信和公告等消息。"
  },
  settings: {
    name: "账号设置",
    path: "/personal/settings",
    component: "AccountSettings.vue",
    category: "个人中心",
    description: "管理账号安全和偏好设置，包括密码修改、登录设置和界面偏好等。"
  }
};

// 获取面包屑数据
const getBreadcrumbData = (): BreadcrumbItemType[] => {
  const routeInfo = getRouteInfo();
  const breadcrumbItems: BreadcrumbItemType[] = [{ label: "首页", value: "home", icon: "home" }];

  if (routeInfo.category) {
    const categories = routeInfo.category.split("/");
    categories.forEach((category, index) => {
      breadcrumbItems.push({
        label: category,
        value: `category-${index}`
      });
    });
  }

  breadcrumbItems.push({
    label: routeInfo.name,
    value: activeRoute.value,
    disabled: true
  });

  return breadcrumbItems;
};

// 获取当前路由信息
const getRouteInfo = (): RouteInfoType => {
  const defaultInfo: RouteInfoType = {
    name: "未知页面",
    path: "/unknown",
    component: "Unknown.vue",
    category: "未分类",
    description: "该页面不存在或尚未配置。"
  };
  return routeInfoMap[activeRoute.value] || defaultInfo;
};
</script>

<style lang="scss" scoped>
.test-container {
  padding: 24px;

  h2 {
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 28px;
    color: #1f2937;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 12px;
  }
}

.test-menu-container {
  width: 240px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  overflow: hidden;
}

.test-description {
  margin-top: 16px;
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 4px;
  color: #4b5563;
  font-size: 14px;
}

.test-accordion {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__description {
    background-color: #f9fafb;
    padding: 12px 16px;
    border-radius: 4px;
    border-left: 4px solid #3b82f6;
    font-size: 14px;

    p {
      margin-top: 0;
      margin-bottom: 8px;
      font-weight: 500;
      color: #1f2937;
    }

    ul {
      margin: 0;
      padding-left: 20px;
      color: #4b5563;

      li {
        margin-bottom: 4px;
      }
    }
  }

  &__info {
    margin-top: 12px;
    padding: 12px;
    background-color: #f3f4f6;
    border-radius: 4px;
    font-size: 14px;

    .info-item {
      display: flex;
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .info-label {
      width: 80px;
      font-weight: 500;
      color: #374151;
    }

    .info-value {
      flex: 1;
      color: #1f2937;
      word-break: break-all;
    }
  }
}

.mode-switch-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.mode-switch {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mode-switch__options {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mode-switch__title {
  font-weight: 500;
  color: #374151;
}

.test-menu-mode {
  display: flex;
  gap: 40px;
}

.menu-mode-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mode-title {
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.menu-application-preview {
  display: flex;
  height: 600px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f5f7fa;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.preview-title {
  font-weight: 500;
  font-size: 16px;
  color: #1f2937;
}

.preview-controls {
  display: flex;
  gap: 8px;
}

.app-header {
  height: 56px;
  background-color: #fff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  padding: 0 16px;
  justify-content: space-between;
}

.app-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #3b82f6;
  font-weight: 600;
  font-size: 16px;
}

.menu-sidebar {
  width: 240px;
  border-right: 1px solid #e5e7eb;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.menu-sidebar.collapsed {
  width: 60px;
}

.app-name {
  transition: opacity 0.3s;
  white-space: nowrap;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4b5563;
}

.user-name {
  font-size: 14px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #6b7280;
}

.crumb {
  white-space: nowrap;
}

.crumb-separator {
  margin: 0 8px;
  color: #d1d5db;
}

.crumb.active {
  color: #1f2937;
  font-weight: 500;
}

.menu-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.route-container {
  flex: 1;
  padding: 24px;
  overflow: auto;
}

.route-info {
  margin-bottom: 24px;
  padding: 16px;
  background-color: #f0f9ff;
  border-radius: 4px;
  border-left: 4px solid #3b82f6;

  h3 {
    margin-top: 0;
    margin-bottom: 16px;
    color: #1f2937;
    font-size: 18px;
    font-weight: 600;
  }
}

.route-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.route-item {
  display: flex;
  font-size: 14px;
}

.route-label {
  width: 100px;
  color: #4b5563;
  font-weight: 500;
}

.route-value {
  color: #111827;
  font-weight: 400;
}

.route-content {
  background-color: #f9fafb;
  border-radius: 4px;
  overflow: auto;
}

.route-content-inner {
  padding: 20px;

  p {
    color: #374151;
    margin-bottom: 12px;
  }

  strong {
    color: #111827;
    font-weight: 600;
  }
}
</style>
