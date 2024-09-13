import { reactive, onDeactivated, toRefs } from "vue";

export function useDraggable(gap: number = 18) {
  const dragConfig = reactive({
    // 是否启动拖动
    isDrag: false,
    // 按下xy轴
    dragDownVal: { x: 0, y: 0 },
    // 移动xy轴
    dragMoveVal: { x: 0, y: 0 },
    // 拖动元素
    element: void 0,
    // 指定拖动元素位置
    dragPosition: "",
    // 拖动元素临时切换样式
    temStyle: ""
  });

  /**
   * 处理按下事件
   * @param event 事件
   * @returns
   */
  const dragDown = (event: MouseEvent) => {
    const { element, dragPosition, dragDownVal, dragMoveVal } = dragConfig;
    if (!element) return;
    // 判断如果设置了指定元素
    if (dragPosition && document.querySelector(dragPosition) !== event.target) return;
    // 保存按下值
    dragDownVal.x = event.clientX - element.offsetLeft;
    dragDownVal.y = event.clientY - element.offsetTop;
    dragMoveVal.x = event.clientX;
    dragMoveVal.y = event.clientY;
    dragConfig.isDrag = true;
    element.style.transition = "none";
    // 注册移动事件
    document.addEventListener("mousemove", dragMove);
    document.addEventListener("mouseup", dragUp);
  };

  /**
   * 处理弹起事件
   */
  const dragUp = () => {
    const { element, temStyle, dragDownVal, dragMoveVal } = dragConfig;
    if (!element) return;
    // 恢复样式
    element.style.transition = temStyle;
    // 恢复保存值
    dragConfig.isDrag = false;
    dragDownVal.x = 0;
    dragDownVal.y = 0;
    dragMoveVal.x = 0;
    dragMoveVal.y = 0;
    // 销毁事件
    document.removeEventListener("mousemove", dragMove);
    document.removeEventListener("mouseup", dragUp);
  };

  /**
   * 处理移动事件
   * @param event 事件
   * @returns
   */
  const dragMove = (event: MouseEvent) => {
    const { element, isDrag, dragDownVal, dragMoveVal } = dragConfig;
    if (!element || !isDrag) return;
    if (!isDrag) return;
    // 计算弹框新的位置
    let newX = event.clientX - dragDownVal.x;
    const maxX = window.innerWidth - element.offsetWidth / 2 - gap;
    const minX = element.offsetWidth / 2 + gap;
    let newY = event.clientY - dragDownVal.y;
    const maxY = window.innerHeight - element.offsetHeight / 2 - gap;
    const minY = element.offsetHeight / 2 + gap;

    // 设置弹框新的位置
    element.style.left = `${Math.min(Math.max(newX, minX), maxX)}px`;
    element.style.top = `${Math.min(Math.max(newY, minY), maxY)}px`;

    // 更新鼠标位置
    dragMoveVal.x = event.clientX;
    dragMoveVal.y = event.clientY;
  };
  /**
   * 注入拖动事件
   */
  const injectDrag = (dragElement: HTMLElement, dragPosition?: string) => {
    if (!dragElement) return;
    dragElement.addEventListener("mousedown", dragDown);
    // 临时保存样式
    dragConfig.temStyle = dragElement.style.transition;
    // 保存dom信息
    dragConfig.element = dragElement;
    dragConfig.dragPosition = dragPosition;
  };
  // 销毁事件
  onDeactivated(() => {
    if (dragConfig.element) dragConfig.element.removeEventListener("mousedown", dragDown);
  });
  return {
    injectDrag,
    ...toRefs(dragConfig)
  };
}
