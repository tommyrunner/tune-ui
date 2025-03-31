import type { FontType } from "./watermark";

/**
 * @description 默认字体样式
 */
export const DEFAULT_FONT: FontType = {
  color: "rgba(0, 0, 0, 0.15)",
  fontSize: 16,
  fontWeight: "normal",
  fontFamily: "sans-serif",
  fontStyle: "normal",
  textAlign: "center",
  textBaseline: "middle"
};

/**
 * @description 默认间距
 */
export const DEFAULT_GAP: [number, number] = [10, 12];

/**
 * @description 默认z-index
 */
export const DEFAULT_Z_INDEX = 9;

/**
 * @description 默认旋转角度
 */
export const DEFAULT_ROTATE = -22;

/**
 * @description 默认水印宽度
 */
export const DEFAULT_WIDTH = 200;

/**
 * @description 默认水印高度
 */
export const DEFAULT_HEIGHT = 100;

/**
 * @description 默认透明度
 */
export const DEFAULT_OPACITY = 1.0;

/**
 * @description 默认图片渲染模式
 */
export const DEFAULT_IMAGE_MODE = "contain";

/**
 * @description 默认字体粗细
 */
export const DEFAULT_FONT_WEIGHT = "normal";

/**
 * @description MutationObserver配置
 */
export const OBSERVER_CONFIG = {
  subtree: true,
  childList: true,
  attributes: true,
  attributeOldValue: true,
  characterData: true,
  characterDataOldValue: true
};
