import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, ExposesType } from "./watermark";
import Watermark from "./index.vue";

/**
 * @description 导出Watermark组件
 * @component TWatermark
 */
export const TWatermark = Watermark as unknown as SFCWithInstall<PropsType, ExposesType, SlotsType, {}>;

/**
 * @description 导出Watermark组件类型
 * @typedef {InstanceType<typeof TWatermark>} TWatermarkType
 */
export type TWatermarkType = InstanceType<typeof TWatermark>;

// 导出类型定义
