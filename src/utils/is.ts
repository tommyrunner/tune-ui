/**
 * @description: 判断值是否未某个类型
 */
export function is(val: unknown, type: string) {
  return Object.prototype.toString.call(val).toLowerCase() === `[object ${type.toLowerCase()}]`;
}

/**
 * @description:  是否为函数
 */
export function isFunction<T = Function>(val: unknown): val is T {
  return is(val, "function") || is(val, "asyncfunction");
}

/**
 * @description: 是否已定义
 */
export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== "undefined";
};

/**
 * @description: 是否未定义
 */
export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val);
};

/**
 * @description: 是否为对象
 */
export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, "object");
};

/**
 * @description:  是否为时间
 */
export function isDate(val: unknown): val is Date {
  return is(val, "date");
}

/**
 * @description:  是否为数值
 */
export function isNumber(val: unknown): val is number {
  return is(val, "number");
}

/**
 * @description:  是否为AsyncFunction
 */
export function isAsyncFunction<T = any>(val: unknown): val is Promise<T> {
  return is(val, "asyncfunction");
}

/**
 * @description:  是否为promise
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, "promise") && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

/**
 * @description:  是否为字符串
 */
export function isString(val: unknown): val is string {
  return is(val, "string");
}

/**
 * @description:  是否为boolean类型
 */
export function isBoolean(val: unknown): val is boolean {
  return is(val, "boolean");
}
/**
 * @description:  是否为 Float 类型
 */
export function isFloat(val: unknown): val is Number {
  return isNumber(val) && Number.isFinite(val) && Math.floor(val) !== val;
}

/**
 * @description:  是否为数组
 */
export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

/**
 * @description: 是否客户端
 */
export const isClient = () => {
  return typeof window !== "undefined";
};

/**
 * @description: 是否为浏览器
 */
export const isWindow = (val: any): val is Window => {
  return typeof window !== "undefined" && is(val, "window");
};

/**
 * @description: 是否为 element 元素
 */
export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!val.tagName;
};

/**
 * @description: 是否为 null
 */
export function isNull(val: unknown): val is null {
  return val === null;
}

/**
 * @description: 是否为 null || undefined
 */
export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val);
}
/**
 *
 * @param val 判断是否有真实值
 * @returns
 */
export function isValue(val: unknown): val is object | any[] | string | number {
  if (isNumber(val)) return val !== 0;
  if (isArray(val) || isString(val)) return val.length > 0;
  if (isObject(val)) return Object.keys(val).length > 0;
  return !isUnDef(val) && !isNull(val);
}
/**
 * @description: 是否为 16 进制颜色
 */
export const isHexColor = (str: string) => {
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str);
};

/**
 * 判断两个值是否相等（支持深层对比）
 * @param source 源值
 * @param target 目标值
 * @returns boolean
 */
export function isEqual(source: unknown, target: unknown): boolean {
  // 基础类型或引用相同直接返回true
  if (source === target) return true;

  // 如果其中一个是null或undefined，返回false
  if (isNullOrUnDef(source) || isNullOrUnDef(target)) return false;

  // 如果类型不同，直接返回false
  if (Object.prototype.toString.call(source) !== Object.prototype.toString.call(target)) return false;

  // 处理日期对象
  if (isDate(source) && isDate(target)) {
    return source.getTime() === target.getTime();
  }

  // 处理正则表达式
  if (is(source, "RegExp") && is(target, "RegExp")) {
    return source.toString() === target.toString();
  }

  // 对象类型比较（包括普通对象、数组等）
  if (isObject(source) || isArray(source)) {
    // 如果长度不同，直接返回false
    const sourceKeys = Object.keys(source as object);
    const targetKeys = Object.keys(target as object);

    if (sourceKeys.length !== targetKeys.length) return false;

    // 递归比较每个属性
    return sourceKeys.every(key => {
      const sourceValue = (source as Record<string, unknown>)[key];
      const targetValue = (target as Record<string, unknown>)[key];

      // 递归比较
      return isEqual(sourceValue, targetValue);
    });
  }

  // 其他类型（如函数）直接返回false
  return false;
}
