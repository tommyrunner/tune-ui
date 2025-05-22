/// <reference types="vitepress/client" />

// 为Vite定义环境变量类型
interface ImportMetaEnv {
  SSR: boolean;
  MODE: string;
  DEV: boolean;
  PROD: boolean;
  BASE_URL: string;
  readonly VITE_APP_TITLE?: string;
  readonly [key: string]: any;
}

// 扩展ImportMeta接口
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// 声明.vue模块
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
