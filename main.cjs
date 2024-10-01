// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const electron = require('electron')
const Menu = electron.Menu

const createWindow = () => {
    // Create the browser window.
    Menu.setApplicationMenu(null)
    const mainWindow = new BrowserWindow({
        width: 860,
        height: 560,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            webviewTag: true,
            javascript: true,
            plugins: true,
            webSecurity: false
        }
    })

    // 加载 index.html
    mainWindow.loadFile('dist/index.html')

    // 打开开发工具
    // mainWindow.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
    createWindow()

})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。