import { is, isNumber, isString } from "./is";
export function isKeyboard(event: KeyboardEvent, key: string | number) {
  if (is(key, "Number")) return event.keyCode === key;
  else event.key.toLocaleLowerCase() === key.toLocaleString();
}

/**
 * 处理绑定防抖事件
 * @param fun 事件触发
 * @param delay 延迟
 */
export function bindDebounce<T>(fun: (data?: T) => void | Function, delay: number) {
  let timeout: undefined | NodeJS.Timeout = void 0;
  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (fun) fun(...args);
      clearTimeout(timeout);
      timeout = void 0;
    }, delay);
  };
}
/**
 * 处理绑定节流事件
 * @param fun 事件触发
 * @param delay 延迟
 */
export function bindThrottle<T>(fun: (data?: T) => void, delay: number) {
  let isThrottled = false;
  return function (...args: any[]) {
    if (!isThrottled) {
      fun(...args);
      isThrottled = true;
      setTimeout(() => (isThrottled = false), delay);
    }
  };
}

const requestAnimationFrame = window.requestAnimationFrame;
export class AnimationFrame {
  delay: number;
  id: number;
  /**
   * AnimationFrame 循环事件类
   * @param delay 事件循环延迟时间
   */
  constructor(delay: number) {
    this.delay = delay;
  }
  /**
   * 循环触发
   * @param fun 循环事件处理回调
   * @param immediate 是否立即触发
   */
  call(fun: Function, immediate: boolean = false) {
    // 如果不支持requestAnimationFrame，使用setInterval代替事件循环
    if (!requestAnimationFrame) {
      window.setInterval(fun, this.delay);
    }
    // Use the time axis to control the trigger time
    let endTime = Date.now() + this.delay;
    if (immediate) fun.call(this);
    const run = () => {
      if (Date.now() > endTime) {
        fun.call(this);
        endTime = Date.now() + this.delay;
      }
      this.id = requestAnimationFrame(run);
    };
    this.id = requestAnimationFrame(run);
  }
  /**
   * 清空事件循环
   * @returns
   */
  clear() {
    if (!this.id) return;
    if (!requestAnimationFrame) {
      window.clearInterval(this.id);
    } else {
      window.cancelAnimationFrame(this.id);
    }
  }
}
/**
 * 生成唯一id(通过随机数+时间戳)
 * @returns string
 */
export function generateId() {
  const timestamp = String(Date.now());
  const randomPart = Math.random().toString(36).slice(2, 6);
  return `${timestamp.slice(timestamp.length - 4, timestamp.length)}${randomPart}`;
}
/**
 * 是否按下某个键盘按键
 * @param event 事件信息
 * @param key 按键key
 * @returns
 */
export function isDownKeyboard(event: KeyboardEvent, key: string) {
  return key.toLocaleLowerCase() === event.key.toLocaleLowerCase();
}

/**
 * 获取该元素最大的z-index值
 * @param selectors  元素
 * @returns
 */
export function getMaxZIndex(selectors: string) {
  // 控制遮罩层层级
  const modelChild: HTMLElement[] = Array.from(document.querySelectorAll(selectors));
  let maxZIndex = 0;
  modelChild.forEach(m => {
    const elZIndex = parseInt(m.style.zIndex);
    if (elZIndex >= maxZIndex) maxZIndex = elZIndex;
  });
  return maxZIndex;
}
/**
 * 格式化css四位值
 * @param params 可以是数字、字符串或者它们的数组
 */
export function fromCssVal(params: (number | string)[] | string | number): string {
  // 处理单个值
  if (isNumber(params)) return `${params}px`;
  if (isString(params)) return params;

  // 确保是数组
  if (!Array.isArray(params)) return "";

  // 处理数组值
  return params
    .filter(item => isNumber(item) || isString(item)) // 只保留数字和字符串
    .map(item => {
      if (isString(item)) return item;
      // 对数字进行处理，如果不是数字则默认为0
      const number = isNumber(item) ? item : 0;
      return `${number}px`; // 转换为字符串并添加'px'
    })
    .filter(str => str) // 过滤掉空字符串
    .join(" "); // 连接成单个字符串
}

/**
 * 计算对象数组合计
 * @param data 对象数组
 * @param key 计算的key
 */
export const dataSummary = (data: any[], key: string) => {
  if (!data || !key) {
    return null; // 如果数据或属性名不存在，直接返回null
  }
  return data.reduce((acc, current = {}) => {
    const value = current[key];
    if (typeof value === "number") {
      return acc + value;
    }
    return null; // 遇到非数字类型，返回null，表示无法计算总和
  }, 0);
};
