import type { SFCWithInstall } from "@/utils/pack";
import type { PropsType, SlotsType, EmitsType, ExposesType } from "./upload";
import Upload from "./index.vue";

/** 上传组件 */
export const TUpload = Upload as unknown as SFCWithInstall<PropsType, ExposesType, SlotsType, EmitsType>;
export type TUploadType = InstanceType<typeof TUpload>;
