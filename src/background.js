'use strict'
import { app, protocol, BrowserWindow, ipcMain, Menu, Tray, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let tray = null

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080'
  : `file://${__dirname}/index.html`

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 650,
    /*frame:false,//去掉外边框*/
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      webSecurity: false, // 是否禁用浏览器的跨域安全特性
      nodeIntegration: true, // 是否完整支持 node
    },
  })

  // require('./display/menu')
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    //当应用开启时打开右侧的调试工具
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL(winURL)
  }
  win.on('closed', () => {
    win = null
  })
  win.setMenu(null);
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
      // 全局注册打开控制台的快捷方式
      globalShortcut.register('CommandOrControl+i', function () {
        win.webContents.openDevTools()
      })
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  require('./plugin/menu');
  require('./plugin/tray')
  createWindow()
})


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}


// 定义calendar窗体 (hash 模式)
const candlerURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:8080/index.html#/main/candler`
  : `file://${__dirname}/index.html#/main/candler`

let candlerWIN = null;
// 创建calendar窗口方法
function openCalendarWindow() {
  if (candlerWIN === null) { // 解决不要同时打开多个相同页面的情况
    candlerWIN = new BrowserWindow({
      width: 800,
      height: 650,
      parent: win, // win是主窗口
      webPreferences: {
        nodeIntegration: true,
        // frame: false
      }
    })
    candlerWIN.loadURL(candlerURL);
    candlerWIN.webContents.openDevTools();
  } else {
    candlerWIN.show();
  }
  // 判断用户当前是否确定关闭该页面
  candlerWIN.on('close', (e) => {
    e.preventDefault();
    dialog.showMessageBox({ // 可封装成一个外部方法然后内部调用（复用性比较强 ）
      title: "Close Window",
      message: "Are you sure you want to close the window?",
      buttons: ["是", "否"],
      defaultId: 0,
      cancelId: 0
    }).then(result => {
      console.log(result.response);
      if (result.response == 0) {
        candlerWIN.destroy(); // 销毁窗口
        win.focus();  // 使得主窗口获得焦点
        candlerWIN = null;
      }
    })
  })
  candlerWIN.setMenu(null);
}

ipcMain.on('openCalendarWindow', e => {
  openCalendarWindow();
  win.webContents.send('printOut', "message")
  }
)

ipcMain.on('changWindowSize', event => {
  win.setSize(1000, 800)
})