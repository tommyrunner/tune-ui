import Progress from "./index.vue";

/**
 * @description 导出Progress组件
 * @component TProgress
 */
export const TProgress = Progress;
export default TProgress;

// 组件类型
export type ProgressInstance = InstanceType<typeof Progress>;
