<template>
  <div style="margin-top: 50px">
    <div @dblclick="removeItem">
      <el-tag>标签一</el-tag>
      <el-tag type="success">标签二</el-tag>
      <el-tag type="info">标签三</el-tag>
      <el-tag type="warning">标签四</el-tag>
      <el-tag type="danger">标签五</el-tag>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
  },
  data() {
    return {};
  },
  methods: {

    removeItem(event) {
      // 动态删除列表元素的一种方式
      console.log(event.target.remove());
    },
  },
};
// 创建右键点击菜单(打包在 .js 文件中) => 显得不会太过于冗余
const { remote } = window.require("electron");
const { Menu, MenuItem } = remote;

const menu = new Menu();
menu.append(
  new MenuItem({
    label: "MenuItem1",
    click() {
      console.log("item 1 clicked");
    },
  })
);
menu.append(new MenuItem({ type: "separator" }));
menu.append(
  new MenuItem({ label: "MenuItem2", type: "checkbox", checked: true })
);

window.addEventListener(
  "contextmenu",
  (e) => {
    e.preventDefault();
    menu.popup({ window: remote.getCurrentWindow() });
  },
  false
);
</script>

<style scoped>
#selfChart {
  width: 95%;
  height: 300px;
  margin: 20px auto;
  border: 1px solid #ccc;
}
</style>
