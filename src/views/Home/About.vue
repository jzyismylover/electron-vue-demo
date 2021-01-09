<template>
  <div class="about">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/about">活动管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <button @click="openCalendarWindow">请点击我</button>
  </div>
</template>

<script>
const { ipcRenderer } = window.require("electron");
ipcRenderer.on("printOut", function (event, data) {
  console.log(data);
});
export default {
  data() {
    return {};
  },
  mounted() {
    /*this.changeWindowSize()*/
  },
  methods: {
    changeWindowSize() {
      ipcRenderer.send("changWindowSize");
    },
    openCalendarWindow() {
      ipcRenderer.send("openCalendarWindow");
    },
  },
};
</script>

<style>
</style>
