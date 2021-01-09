<template>
  <div>
    <el-button @click="ShowMessage">弹出信息</el-button>
    <el-button @click="Dirct">跳转页面</el-button>
    <el-button @click="insert">插入数据</el-button>
    <el-button @click="open">打开窗口</el-button>
    <el-button @click="system_message">系统信息</el-button>
    <el-button @click="output">导出</el-button>
    <div>{{ value }}</div>
  </div>
</template>

<script>
/*
 *require 方法是绑定在 window 上的， 所以在渲染进程中使用的话得加 windows*/
const { dialog, BrowserWindow } = window.require("electron").remote;
const { shell } = window.require("electron");
const fs = window.require('fs');
export default {
  data() {
    return {
      value:""
    }
  },
  methods: {
    ShowMessage() {
      var template = {
        title: "请问您今天吃饭了吗？",
        body: "主体内容",
      };
      new Notification(template.title, template);
    },
    Dirct() {
      //路由跳转跟 vue的类似
      this.$router.push("/candler");
    },
    insert() {
      // 用于插入一些 excel、word、json 等数据文件
      dialog
        .showOpenDialog({
          title: "请选择需要的数据文件！",
          filters: [
            // 格式化用户选择的文件
            { name: "Images", extensions: ["jpg"] },
            { name: "Movies", extensions: ["mkv", "avi", "mp4"] },
            { name: "Custom File Type", extensions: ["as"] },
            { name: "All Files", extensions: ["*"] },
          ],
        })
        .then((res) => {
          console.log(res.filePaths);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    open() {
      // 打开窗口
      var win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true,
        },
      });
      /*shell.openExternal("https://jspang.com");*/ // 转入技术文档
    },
    system_message() {
      let system = "";
      // 获取系统信息
      var os = window.require("os");
      // CPU 的字节序
      system += "endianness : " + os.endianness();
      // 操作系统名
      system += " type : " + os.type();
      // 操作系统名
      system += " platform : " + os.platform();
      // 系统内存总量
      system += " total memory : " + 1.0 * os.totalmem() / 1024  / 1024 / 1024 + " GB.";
      // 操作系统空闲内存量
      system += " free memory : " +1.0 * os.freemem() / 1024 / 1024 / 1024 + " GB.";
      this.value = system;
    },
    output() {
    }
  },
};
</script>

<style scoped>
button {
  margin-top: 20px;
  margin: 30px;
}
</style>
