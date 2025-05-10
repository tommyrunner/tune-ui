import type { EmitsType, PropsType, TableColumnsType, TableRowType } from "./table";
import type { ListSlotParamsType } from "@/packages/list-view/list-view";
import { TCheckbox } from "@/packages/checkbox";
import { TABLE_COL_FIXED_LAST } from "./constants";
import TTableRow from "./table-row/table-row.vue";
import { computed, h, VNode } from "vue";

/**
 * 处理table功能列hooks
 * @param props 参数
 * @param emit 事件
 * @returns
 */
export function useTable(props: PropsType, emit: EmitsType) {
  /**
   * 过滤并处理列配置
   */
  const filterColumns = computed((): TableColumnsType[] => {
    const columnsCopy = {
      left: [] as TableColumnsType[],
      right: [] as TableColumnsType[],
      cols: [] as TableColumnsType[]
    };

    // 处理选择列
    if (props.changeType !== "none") {
      columnsCopy.left.push({
        label: "选择",
        prop: "select",
        width: 60,
        fixed: "left",
        render: params =>
          h(TCheckbox, {
            modelValue: params.data[props.changeKey],
            onChange: () => handleSelectionChange(params)
          })
      });
    }

    // 分类固定列
    props.columns.forEach(col => {
      if (col.fixed === "left") {
        columnsCopy.left.push(col);
      } else if (col.fixed === "right") {
        columnsCopy.right.push(col);
      } else {
        columnsCopy.cols.push(col);
      }
    });

    // 设置固定列边缘标记
    if (columnsCopy.left.length) {
      columnsCopy.left[columnsCopy.left.length - 1][TABLE_COL_FIXED_LAST] = true;
    }
    if (columnsCopy.right.length) {
      columnsCopy.right[0][TABLE_COL_FIXED_LAST] = true;
    }

    // 排序处理
    return [...columnsCopy.left, ...columnsCopy.cols, ...columnsCopy.right].sort((a, b) => {
      return (a.sort || 0) - (b.sort || 0);
    });
  });

  /**
   * 处理选择变更
   */
  const handleSelectionChange = (params: any) => {
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
  };

  /**
   * 渲染表格行
   * @description 使用h函数创建表格行组件
   * @param {ListSlotParamsType} scope - 列表插槽参数
   * @param {boolean} isHead - 是否为表头
   * @param {boolean} isFoot - 是否为表尾
   * @returns {VNode} 渲染的虚拟节点
   */
  const renderTableRow = (scope: ListSlotParamsType, isHead: boolean, isFoot: boolean): VNode => {
    return h(TTableRow, {
      key: scope.index,
      rowIndex: scope.index,
      row: scope.row,
      isHead: isHead,
      isFoot: isFoot,
      onClickRow: (params: TableRowType) => emit("click-row", params)
    });
  };

  return { filterColumns, renderTableRow };
}
