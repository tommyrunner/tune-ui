import { TCheckbox } from "../checkbox";
import type { EmitsType, PropsType, TableColumnsType } from "./table";
import { computed } from "vue";

export function useTable(props: PropsType, emit: EmitsType) {
  /**
   * 过滤列
   * @returns 列配置
   */
  const filterColumns = computed((): TableColumnsType[] => {
    const columnsCopy = {
      left: [] as TableColumnsType[],
      right: [] as TableColumnsType[],
      cols: [] as TableColumnsType[]
    };
    // 处理选择特殊列
    if (props.changeType !== "none") {
      columnsCopy.left.push({
        label: "选择",
        prop: "select",
        render: params => {
          return (
            <TCheckbox
              v-model={params.data[props.changeKey]}
              onChange={() => {
                if (props.changeType === "single") {
                  props.data.forEach(row => {
                    row[props.changeKey] = false;
                  });
                  params.data[props.changeKey] = true;
                }
                emit("checked", {
                  row: params.data,
                  data: props.data
                });
              }}
            />
          );
        }
      });
    }
    // 悬浮字段默认靠边
    props.columns.forEach(col => {
      if (col.fixed === "left") {
        columnsCopy.left.push(col);
      } else if (col.fixed === "right") {
        columnsCopy.right.push(col);
      } else columnsCopy.cols.push(col);
    });
    // 设置边缘标记
    if (columnsCopy.left.length) columnsCopy.left[columnsCopy.left.length - 1]._fixedLast = true;
    if (columnsCopy.right.length) columnsCopy.right[0]._fixedLast = true;
    // 排序功能
    return [...columnsCopy.left, ...columnsCopy.cols, ...columnsCopy.right].sort((a, b) => {
      return (a.sort || 0) - (b.sort || 0);
    });
  });
  return { filterColumns };
}
