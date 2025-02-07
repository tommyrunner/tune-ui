import { reactive, toRefs, onUnmounted } from "vue";

/** 拖动状态配置类型 */
interface DragConfig {
  /** 是否正在拖动 */
  isDrag: boolean;
  /** 鼠标按下时的初始坐标 */
  dragDownVal: { x: number; y: number };
  /** 鼠标移动时的实时坐标 */
  dragMoveVal: { x: number; y: number };
  /** 需要拖动的目标元素 */
  element?: HTMLElement;
  /** 指定触发拖动的元素选择器 */
  dragPosition: string;
  /** 元素原有的过渡样式 */
  temStyle: string;
}

/**
 * 拖拽功能Hook
 * @param gap 拖动边界的安全距离
 */
export function useDraggable(gap: number = 18) {
  // 拖动状态管理
  const dragConfig = reactive<DragConfig>({
    isDrag: false,
    dragDownVal: { x: 0, y: 0 },
    dragMoveVal: { x: 0, y: 0 },
    element: void 0,
    dragPosition: "",
    temStyle: ""
  });

  /**
   * 处理鼠标按下事件
   * 初始化拖动状态和位置信息
   */
  const dragDown = (event: MouseEvent) => {
    const { element, dragPosition, dragDownVal, dragMoveVal } = dragConfig;
    if (!element) return;

    // 如果指定了触发元素,则检查点击的是否为指定元素
    if (dragPosition && document.querySelector(dragPosition) !== event.target) return;

    // 记录鼠标按下时的初始位置
    dragDownVal.x = event.clientX - element.offsetLeft;
    dragDownVal.y = event.clientY - element.offsetTop;
    dragMoveVal.x = event.clientX;
    dragMoveVal.y = event.clientY;

    // 开启拖动状态并移除过渡效果
    dragConfig.isDrag = true;
    element.style.transition = "none";

    // 绑定拖动相关事件
    document.addEventListener("mousemove", dragMove);
    document.addEventListener("mouseup", dragUp);
  };

  /**
   * 处理鼠标松开事件
   * 清理拖动状态和事件监听
   */
  const dragUp = () => {
    const { element, temStyle, dragDownVal, dragMoveVal } = dragConfig;
    if (!element) return;

    // 恢复元素原有样式
    element.style.transition = temStyle;

    // 重置拖动状态
    dragConfig.isDrag = false;
    dragDownVal.x = dragDownVal.y = 0;
    dragMoveVal.x = dragMoveVal.y = 0;

    // 移除事件监听
    document.removeEventListener("mousemove", dragMove);
    document.removeEventListener("mouseup", dragUp);
  };

  /**
   * 处理鼠标移动事件
   * 计算并更新元素位置,处理边界约束
   */
  const dragMove = (event: MouseEvent) => {
    const { element, isDrag, dragDownVal, dragMoveVal } = dragConfig;
    if (!element || !isDrag) return;

    // 计算新位置
    const newX = event.clientX - dragDownVal.x;
    const newY = event.clientY - dragDownVal.y;

    // 计算边界值(考虑元素尺寸的一半以确保不会完全超出视口)
    const maxX = document.documentElement.clientWidth - element.offsetWidth / 2 - gap;
    const minX = gap + element.offsetWidth / 2;
    const maxY = document.documentElement.clientHeight - element.offsetHeight / 2 - gap;
    const minY = gap + element.offsetHeight / 2;

    // 应用位置更新(确保在边界范围内)
    element.style.left = `${Math.min(Math.max(newX, minX), maxX)}px`;
    element.style.top = `${Math.min(Math.max(newY, minY), maxY)}px`;

    // 更新当前鼠标位置
    dragMoveVal.x = event.clientX;
    dragMoveVal.y = event.clientY;
  };

  /**
   * 注入拖动功能
   * @param dragElement 需要支持拖动的元素
   * @param dragPosition 触发拖动的元素选择器
   */
  const injectDrag = (dragElement: HTMLElement, dragPosition?: string) => {
    if (!dragElement) return;

    // 绑定鼠标按下事件
    dragElement.addEventListener("mousedown", dragDown);

    // 保存元素信息
    dragConfig.temStyle = dragElement.style.transition;
    dragConfig.element = dragElement;
    dragConfig.dragPosition = dragPosition || "";
  };

  // 组件卸载时清理事件监听
  onUnmounted(() => {
    if (dragConfig.element) {
      dragConfig.element.removeEventListener("mousedown", dragDown);
    }
  });

  return {
    injectDrag,
    ...toRefs(dragConfig)
  };
}
