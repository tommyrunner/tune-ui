import Image from "./index.vue";
import ImageViewer from "./image-viewer.vue";

/**
 * @description 导出图片组件
 * @component TImage
 */
export const TImage = Image;

/**
 * @description 导出图片预览器组件
 * @component TImageViewer
 */
export const TImageViewer = ImageViewer;

/**
 * @description 导出图片组件类型
 * @typedef {InstanceType<typeof TImage>} TImageType
 */
export type TImageType = InstanceType<typeof TImage>;

/**
 * @description 导出图片预览器组件类型
 * @typedef {InstanceType<typeof TImageViewer>} TImageViewerType
 */
export type TImageViewerType = InstanceType<typeof TImageViewer>;
