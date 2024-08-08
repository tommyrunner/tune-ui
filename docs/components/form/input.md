# Input 输入框

通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 何时使用

- 需要用户输入表单域内容时。
- 用于文字类信息输入场景。

## 示例

待补充

## 组件属性

| 属性         | 说明                                  | 类型                                    | 默认值   |
| ------------ | ------------------------------------- | --------------------------------------- | -------- |
| placeholder  | 占位提示                              | boolean                                 | false    |
| tip         | 描述信息                              | string                                  | -        |
| isTipe   | 是否展示输入提示                      | boolean                                 | -     |
| clearable  | 是否清空                      | boolean                                  | -        |
| password   | 是否是密码框                      | boolean                                  | -        |
| maxlength     | 最大长度                          | number                                 | -     |
| disabled    | 是否禁用                        | boolean                                 | -    |
| debounce    | 防抖事件 | (data?: string) => void                                  | -      |
| debounceDelay         | 防抖延迟时间                    | number                                 | -    |