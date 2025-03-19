/**
 * @description 文件状态类型
 */
export type UploadStatus = "ready" | "uploading" | "success" | "fail";

/**
 * @description 文件列表展示类型
 */
export type ListType = "text" | "picture";

/**
 * @description 上传文件类型
 * @interface UploadFile
 */
export interface UploadFile {
  /** 文件唯一标识 */
  uid: number | string;
  /** 文件名称 */
  name: string;
  /** 文件大小 */
  size?: number;
  /** 文件类型 */
  type?: string;
  /** 文件状态 */
  status?: UploadStatus;
  /** 文件上传进度 (0-100) */
  percentage?: number;
  /** 文件URL地址（上传成功后的资源链接） */
  url?: string;
  /** 上传响应数据 */
  response?: any;
  /** 上传错误信息 */
  error?: Error;
  /** 原始文件对象 */
  raw?: File;
}

/**
 * @description 上传请求选项
 * @interface UploadRequestOptions
 */
export interface UploadRequestOptions {
  /** 上传地址 */
  action: string;
  /** 文件对象 */
  file: File;
  /** 上传文件字段名 */
  filename: string;
  /** 附加数据 */
  data: Record<string, any>;
  /** 请求头 */
  headers: Record<string, string>;
  /** 是否携带凭证 */
  withCredentials: boolean;
  /** 进度回调 */
  onProgress: (percent: number) => void;
  /** 成功回调 */
  onSuccess: (response: any) => void;
  /** 失败回调 */
  onError: (error: Error) => void;
}

/**
 * @description 上传组件Props类型定义
 * @interface PropsType
 */
export interface PropsType {
  /** 上传地址 */
  action: string;
  /** 接受的文件类型 */
  accept?: string;
  /** 上传的文件字段名 */
  name?: string;
  /** 是否支持多选 */
  multiple?: boolean;
  /** 是否启用拖拽上传 */
  drag?: boolean;
  /** 上传时附带的额外参数 */
  data?: Record<string, any>;
  /** 上传请求的headers */
  headers?: Record<string, string>;
  /** 是否支持发送cookie凭证 */
  withCredentials?: boolean;
  /** 是否显示文件列表 */
  showFileList?: boolean;
  /** 上传的文件列表 */
  fileList?: UploadFile[];
  /** 是否自动上传 */
  autoUpload?: boolean;
  /** 文件列表的展示形式 */
  listType?: ListType;
  /** 是否禁用上传 */
  disabled?: boolean;
  /** 单次上传最大数量限制 */
  limit?: number;
  /** 上传文件之前的钩子，参数为上传的文件，若返回false则停止上传 */
  beforeUpload?: (file: File) => boolean | Promise<File | Blob>;
  /** 删除文件之前的钩子，参数为上传的文件和文件列表，若返回false则停止删除 */
  beforeRemove?: (file: UploadFile, fileList: UploadFile[]) => boolean | Promise<boolean>;
  /** 覆盖默认的上传行为，自定义上传实现 */
  httpRequest?: (options: UploadRequestOptions) => Promise<any>;
}

/**
 * @description 图片预览数据结构
 * @interface ImagePreview
 */
export interface ImagePreview {
  /** 预览的源文件 */
  file: UploadFile;
  /** 预览图片列表 */
  previewSrcList?: string[];
  /** 初始预览索引 */
  initialIndex?: number;
}

/**
 * @description 上传组件事件类型定义
 * @interface EmitsType
 */
export interface EmitsType {
  /** 文件上传成功事件 */
  (e: "success", file: UploadFile, response: any): void;
  /** 文件上传失败事件 */
  (e: "error", file: UploadFile, error: Error): void;
  /** 文件上传进度事件 */
  (e: "progress", file: UploadFile, percent: number): void;
  /** 文件状态改变事件 */
  (e: "change", file: UploadFile | null, fileList: UploadFile[]): void;
  /** 文件超出限制事件 */
  (e: "exceed", files: File[], fileList: UploadFile[]): void;
  /** 文件移除事件 */
  (e: "remove", file: UploadFile, fileList: UploadFile[]): void;
  /** 文件预览事件 */
  (e: "preview", file: UploadFile | ImagePreview): void;
}

/**
 * @description 上传组件上下文类型
 * @interface UploadContextType
 */
export interface UploadContextType {
  /** 文件列表 */
  fileList: UploadFile[];
  /** 列表展示类型 */
  listType?: ListType;
  /** 是否禁用 */
  disabled?: boolean;
  /** 处理移除文件 */
  handleRemove: (file: UploadFile) => void;
  /** 处理预览文件 */
  handlePreview: (file: UploadFile | any) => void;
}

/**
 * @description 拖拽上传组件上下文类型
 * @interface UploadDraggerContextType
 */
export interface UploadDraggerContextType {
  /** 是否禁用 */
  disabled?: boolean;
  /** 接受上传的文件类型 */
  accept?: string;
  /** 是否支持多选文件 */
  multiple?: boolean;
  /** 处理文件拖拽事件 */
  handleDrop: (files: FileList) => void;
}
