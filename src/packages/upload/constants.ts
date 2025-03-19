import type { InjectionKey } from "vue";
import type { UploadContextType, UploadDraggerContextType } from "./upload";

/**
 * @description 上传组件注入键
 * @type {InjectionKey<UploadContextType>}
 */
export const uploadKey: InjectionKey<UploadContextType> = Symbol("uploadKey");

/**
 * @description 拖拽上传组件注入键
 * @type {InjectionKey<UploadDraggerContextType>}
 */
export const uploadDraggerKey: InjectionKey<UploadDraggerContextType> = Symbol("uploadDraggerKey"); 