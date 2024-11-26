import { TableColumnsType } from "../table";

/**
 * @description: 组件props类型
 */
export interface PropsType {
  row: any;
  rowIndex?: number;
  isHead?: boolean;

  // 主要处理虚拟列表问题
  columns?: TableColumnsType[];
  defBgColor?: string;
  hoverBgColor?: string;
  // 内部虚拟列表配置
  _virtualConfig?: {
    // 是否虚拟列表
    isVirtualized?: boolean;
  };
}
