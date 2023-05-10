const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 1280,
		height: 1024,
    frame: false,
    webPreferences: {
      andbox: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('./build/index.html')
  //win.loadURL('http://localhost:3000')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
  ipcMain.on("button-interaction", (event, button) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    if(button === "close") {
      win.close()
    }
    else if(button === "min") {
      win.minimize()
    }
    else if(button === "max") {
      let isMaximized = win.isMaximized()
      console.log(win.isMaximized())
      if(isMaximized) {
        win.unmaximize()
      }
      else if (!isMaximized) {
        win.maximize()
      }
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})