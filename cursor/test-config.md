<!-- 测试组件 -->

1. 编写一个测试用例,需要测试到用户的所有配置属性，计以抛出的函数
2. 每个组件中东含有 组件名.ts文件里的PropsType所有属性类型测试属性
3. 根据EmitsType事件测试事件
4. 如果使用icon就使用 @/packages/icon/icon 里的 IconTypes内有的
5. 还需要修改 index.ts文件，添加当前组件的导出
6. 如果使用了icon图标，一定需要使用/icons/iconfont.json里有的图标
7. 当前所有测试组件都放在 /tui/test/packages/ 目录下
8. 并需要同步配置，index.ts导出，home.vue引入使用
9. 测试以test-section分组

基本模板参考 /test/button.vue

并添加到home组件中
