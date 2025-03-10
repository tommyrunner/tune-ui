/** 组件分类 */
export const enum ComponentCategory {
  /** 基础组件 */
  Basic = "基础组件",
  /** 表单组件 */
  Form = "表单组件",
  /** 数据展示 */
  Data = "数据展示",
  /** 反馈组件 */
  Feedback = "反馈组件",
  /** 导航组件 */
  Navigation = "导航组件",
  /** 布局组件 */
  Layout = "布局组件"
}

/** 组件分类配置 */
export interface ComponentConfig {
  /** 组件名称 */
  name: string;
  /** 组件标签 */
  label: string;
  /** 组件分类 */
  category: ComponentCategory;
  /** 组件实例 */
  component: any;
}
