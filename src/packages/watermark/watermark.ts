import type { BaseProps } from "@/types";

/**
 * @description 字体样式类型定义
 * @interface FontType
 */
export interface FontType {
  /** 字体颜色 */
  color?: string;
  /** 字体大小 */
  fontSize?: number;
  /** 字体粗细 */
  fontWeight?: "normal" | "light" | "bold" | number;
  /** 字体族 */
  fontFamily?: string;
  /** 字体样式 */
  fontStyle?: "none" | "normal" | "italic" | "oblique";
  /** 文本对齐方式 */
  textAlign?: "center" | "left" | "right";
  /** 文本基线 */
  textBaseline?: "alphabetic" | "bottom" | "hanging" | "ideographic" | "middle" | "top";
}

/**
 * @description 图片渲染模式
 * @type {string}
 */
export type ImageModeType = "contain" | "cover" | "fill" | "none";

/**
 * @description Watermark组件Props类型定义
 * @interface PropsType
 * @extends {BaseProps}
 */
export interface PropsType extends BaseProps {
  /** 水印宽度 */
  width?: number;
  /** 水印高度 */
  height?: number;
  /** 水印旋转角度，单位度 */
  rotate?: number;
  /** 水印z-index值 */
  zIndex?: number;
  /** 水印图片地址 */
  image?: string;
  /** 图片渲染模式: contain(保持比例缩放), cover(填满并裁剪), fill(拉伸填满), none(原始尺寸) */
  imageMode?: ImageModeType;
  /** 水印文本内容，可以使用字符串或字符串数组表示多行文本 */
  content?: string | string[];
  /** 字体样式 */
  font?: FontType;
  /** 字体粗细，优先级高于font.fontWeight */
  fontWeight?: "normal" | "light" | "bold" | number;
  /** 水印之间的间距 [水平间距, 垂直间距] */
  gap?: [number, number];
  /** 水印距容器左上角的偏移量 [水平偏移, 垂直偏移] */
  offset?: [number, number];
  /** 是否开启防篡改监听 */
  antiTamper?: boolean;
  /** 水印透明度，取值范围0-1 */
  opacity?: number;
}
