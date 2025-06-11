import type { SFCWithInstall } from "@/utils/pack";
import type {
  PropsType as ImagePropsType,
  SlotsType as ImageSlotsType,
  EmitsType as ImageEmitsType,
  ExposesType as ImageExposesType
} from "./image";
import type {
  PropsType as ViewerPropsType,
  SlotsType as ViewerSlotsType,
  EmitsType as ViewerEmitsType,
  ExposesType as ViewerExposesType
} from "./image-viewer";
import Image from "./index.vue";
import ImageViewer from "./image-viewer.vue";

/**
 * @description 导出图片组件
 * @component TImage
 */
/** 导出图片组件 */
export const TImage = Image as unknown as SFCWithInstall<ImagePropsType, ImageExposesType, ImageSlotsType, ImageEmitsType>;

/**
 * @description 导出图片预览器组件
 * @component TImageViewer
 */
/** 导出图片预览器组件 */
export const TImageViewer = ImageViewer as unknown as SFCWithInstall<
  ViewerPropsType,
  ViewerExposesType,
  ViewerSlotsType,
  ViewerEmitsType
>;

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
