/**
 * @description 上传请求错误类型
 */
export class UploadAjaxError extends Error {
  status: number;
  method: string;
  url: string;

  constructor(message: string, status: number, method: string, url: string) {
    super(message);
    this.status = status;
    this.method = method;
    this.url = url;
  }
}

/**
 * @description 文件上传请求
 * @param {Object} options 请求配置选项
 * @returns {Promise<any>}
 */
export function uploadFile(options: {
  action: string;
  file: File;
  filename: string;
  data?: Record<string, any>;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  onProgress?: (percent: number) => void;
  onSuccess?: (response: any) => void;
  onError?: (error: Error) => void;
}): XMLHttpRequest {
  const { action, file, filename, data = {}, headers = {}, withCredentials = false, onProgress, onSuccess, onError } = options;

  // 创建 FormData 实例
  const formData = new FormData();

  // 添加文件
  formData.append(filename, file);

  // 添加其他数据
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });

  // 创建 XHR 实例
  const xhr = new XMLHttpRequest();

  // 上传进度处理
  if (onProgress && xhr.upload) {
    xhr.upload.addEventListener("progress", e => {
      if (e.total > 0) {
        const percent = Math.round((e.loaded * 100) / e.total);
        onProgress(percent);
      }
    });
  }

  // 成功处理
  xhr.addEventListener("load", () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      const response = xhr.responseType === "text" ? xhr.responseText : xhr.response;

      onSuccess?.(response);
    } else {
      onError?.(new UploadAjaxError(xhr.statusText, xhr.status, "POST", action));
    }
  });

  // 错误处理
  xhr.addEventListener("error", () => {
    onError?.(new UploadAjaxError("Network Error", 0, "POST", action));
  });

  // 超时处理
  xhr.addEventListener("timeout", () => {
    onError?.(new UploadAjaxError("Timeout Error", 0, "POST", action));
  });

  // 打开请求
  xhr.open("POST", action, true);

  // 设置凭证
  xhr.withCredentials = withCredentials;

  // 设置默认响应类型
  xhr.responseType = "json";

  // 设置请求头
  Object.keys(headers).forEach(key => {
    xhr.setRequestHeader(key, headers[key]);
  });

  // 发送请求
  xhr.send(formData);

  return xhr;
}
