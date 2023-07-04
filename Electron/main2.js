const { app, BrowserWindow, ipcMain, dialog} = require('electron')
const path = require('path')
const sqlite3 = require("sqlite3").verbose()
global.appRoot = path.resolve(__dirname)

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
		height: 900,
    frame: false,
    webPreferences: {
      Sandbox: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  //win.loadFile('./build/index.html')
  win.loadURL('http://localhost:3000')
}

const database = new sqlite3.Database(appRoot+"./resources/database.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {console.log(err)}
  else console.log("Connected to database")
})

const getFullDB = async (event, arg) => {
  const queryGetAllRows = async (event, arg) => {
    return new Promise((resolve, reject) => {
      database.all(arg, (err, rows) => {
        if(err) {reject(err)}
        else {resolve(rows)}
      })
    })
  }
  const bla = await queryGetAllRows(event, arg)
  return bla
}

const addRowDB = async (event, arg) => {
  //console.log(arg)
  const queryAddRow = async (event, arg) => {
    return new Promise((resolve, reject) => {
      database.run(arg[0], arg[1], (err, rows) => {
        if(err) {reject(err)}
        else {resolve(rows)}
      })
    })
  }
  const bla = await queryAddRow(event, arg)
  return bla
}

const loadRowDB = async (event, arg) => {
  const queryLoadRow = async (event, arg) => {
    return new Promise((resolve, reject) => {
      database.all(arg[0], arg[1], (err, row) => {
        if(err) {reject(err)}
        else {resolve(row)}
      })
    })
  }
  const bla = await queryLoadRow(event, arg)
  return bla
}

const changeRowDB = async (event, arg) => {
  let sql = arg[0]
  let data = arg[1]
  const queryChangeRow = async (event1, arg1) => {
    return new Promise((resolve, reject) => {
      database.run(sql, data, (err, rows) => {
        if(err) {reject(err)}
        else {resolve(rows)}
      })
    })
  }
  const bla = await queryChangeRow(event, data)
  return bla
}


app.whenReady().then(() => {
  ipcMain.handle("get-full-db", async (event, arg) => getFullDB(event, arg))
  ipcMain.handle("add-row", async (event, arg) => addRowDB(event, arg))
  ipcMain.handle("load-row", async (event, arg) => loadRowDB(event, arg))
  ipcMain.handle("change-row", async (event, arg) => changeRowDB(event, arg))
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
  
  
})

app.on('window-all-closed', () => {
  database.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  })
  if (process.platform !== 'darwin') {
    app.quit()
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