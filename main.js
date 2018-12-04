// Modules to control application life and create native browser window
const { app, BrowserWindow, autoUpdater, Menu } = require('electron')
const path = require('path')

// // 自动升级、添加桌面快捷方式
// if (require('electron-squirrel-startup')) return;

// autoUpdater.setFeedURL("?"); //告诉 Electron 到哪个文件服务器检测新版本e.g:"http://localhost/installer2/"
// autoUpdater.on('update-downloaded', function () {
//   autoUpdater.quitAndInstall();
// });
// autoUpdater.checkForUpdates();
// //检测错误
// autoUpdater.on("error", function (err) {
//   console.log(err);
// });
// autoUpdater.on("update-not-available", function () {});

// 生成快捷方式
var handleStartupEvent = function () {
  if (process.platform !== 'win32') {
    return false;
  }

  var squirrelCommand = process.argv[1];

  switch (squirrelCommand) {
    case '--squirrel-install':
    case '--squirrel-updated':
      install();
      return true;
    case '--squirrel-uninstall':
      uninstall();
      app.quit();
      return true;
    case '--squirrel-obsolete':
      app.quit();
      return true;
  }
    // 安装
  function install() {
    var cp = require('child_process');
    var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
    var target = path.basename(process.execPath);
    var child = cp.spawn(updateDotExe, ["--createShortcut", target], { detached: true });
    child.on('close', function(code) {
        app.quit();
    });
  }
   // 卸载
   function uninstall() {
    var cp = require('child_process');    
    var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
    var target = path.basename(process.execPath);
    var child = cp.spawn(updateDotExe, ["--removeShortcut", target], { detached: true });
    child.on('close', function(code) {
        app.quit();
    });
  }

};

if (handleStartupEvent()) {
  return;
}


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // 隐藏菜单栏
  Menu.setApplicationMenu(null)
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    titleBarStyle: 'hidden',
    // transparent: true
  })

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')
  mainWindow.loadFile('./dist/index.html')
  // mainWindow.loadURL("https://electronjs.org/")

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.