<template>
  <div class="table-demo">
    <t-table :columns="columns" :data="tableData" :height="300" :fixedRow="handleFixedRow" :row-style="handleRowStyle" />
  </div>
</template>

<script setup>
// 列配置
const columns = [
  { prop: "id", label: "ID", width: 80 },
  { prop: "name", label: "名称", width: 120 },
  { prop: "age", label: "年龄", width: 100 },
  { prop: "status", label: "状态", width: 100 },
  { prop: "address", label: "地址" }
];

// 表格数据
const tableData = [
  {
    id: 1,
    name: "张三",
    age: 25,
    status: "在线",
    address: "北京市朝阳区",
    important: true
  },
  {
    id: 2,
    name: "李四",
    age: 30,
    status: "离线",
    address: "上海市浦东新区"
  },
  {
    id: 3,
    name: "王五",
    age: 28,
    status: "在线",
    address: "广州市天河区",
    important: true
  },
  {
    id: 4,
    name: "赵六",
    age: 32,
    status: "忙碌",
    address: "深圳市南山区"
  },
  {
    id: 5,
    name: "钱七",
    age: 26,
    status: "在线",
    address: "杭州市西湖区"
  },
  {
    id: 6,
    name: "孙八",
    age: 29,
    status: "在线",
    address: "武汉市洪山区",
    important: true
  },
  {
    id: 7,
    name: "周九",
    age: 31,
    status: "离线",
    address: "南京市鼓楼区"
  },
  {
    id: 8,
    name: "吴十",
    age: 27,
    status: "忙碌",
    address: "成都市武侯区"
  },
  {
    id: 9,
    name: "郑十一",
    age: 33,
    status: "在线",
    address: "重庆市渝中区",
    important: true
  },
  {
    id: 10,
    name: "刘十二",
    age: 24,
    status: "离线",
    address: "西安市雁塔区"
  },
  {
    id: 11,
    name: "陈十三",
    age: 35,
    status: "忙碌",
    address: "天津市和平区"
  },
  {
    id: 12,
    name: "林十四",
    age: 28,
    status: "在线",
    address: "厦门市思明区"
  },
  {
    id: 13,
    name: "黄十五",
    age: 29,
    status: "离线",
    address: "苏州市姑苏区",
    important: true
  },
  {
    id: 14,
    name: "杨十六",
    age: 26,
    status: "在线",
    address: "青岛市市南区"
  },
  {
    id: 15,
    name: "赵十七",
    age: 31,
    status: "忙碌",
    address: "大连市中山区"
  },
  {
    id: 16,
    name: "朱十八",
    age: 34,
    status: "在线",
    address: "宁波市海曙区",
    important: true
  },
  {
    id: 17,
    name: "徐十九",
    age: 27,
    status: "离线",
    address: "济南市历下区"
  },
  {
    id: 18,
    name: "孔二十",
    age: 30,
    status: "在线",
    address: "福州市鼓楼区"
  },
  {
    id: 19,
    name: "马二一",
    age: 25,
    status: "忙碌",
    address: "长沙市岳麓区",
    important: true
  },
  {
    id: 20,
    name: "胡二二",
    age: 32,
    status: "在线",
    address: "合肥市包河区"
  }
];

// 判断行是否固定
const handleFixedRow = (index, row) => {
  return row.important === true;
};

// 设置固定行样式
const handleRowStyle = (index, row) => {
  if (row.important) {
    return {
      backgroundColor: "#f0f9ff",
      fontWeight: "500"
    };
  }
  return {};
};
</script>

<style scoped>
.table-demo {
  width: 100%;
}
</style>
