import Upload from "./index.vue";

// 注册为带安装的组件
export const TUpload = Upload;
export default TUpload;

// 组件类型
export type UploadInstance = InstanceType<typeof Upload>;
