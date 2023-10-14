const { app, BrowserWindow, ipcMain, dialog, shell} = require('electron')
const path = require('path')
const sqlite3 = require("sqlite3").verbose()
const fs = require("fs")

global.appRoot = path.resolve(__dirname)

const { getFullDB, addRowDB, loadRowDB, changeRowDB } = require("./utils/DatabaseFunctions.js")
const { loadAllCharacters, loadCharacter, saveCharacter, updateCharacter } = require("./utils/SaveLoadFunctions.js")

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
		height: 900,
    minWidth: 825,
    frame: false,
    webPreferences: {
      Sandbox: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('./build/index.html')
  //win.loadURL('http://localhost:3000')
  
  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: "deny" }
  })
}

const database = new sqlite3.Database(appRoot+"./resources/database.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {console.log(err)}
  else console.log("Connected to database")
})

const test = (event, arg) => {
  let path = app.getPath("userData") + "\\characters"
  if(!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
  else{
    console.log("folder exixsts already :3")
  }
  let data = {
    name: arg[1][0],
    state: arg[1][1],
    lastSaved: arg[1][2]
  }
  fs.open(path + "\\" + data.name+".json", "w", async (err, fd) => {
    if (err) {
      return console.error(err);
    }
    fs.writeFile(path + "\\" + data.name+".json", JSON.stringify(data), (err) => {
        if (err) throw err;
        else{
          fs.close(fd, (err) => {
            if(err) {
              console.log(err)
            }
          })
        }
    })
  })
}

app.whenReady().then(() => {
  ipcMain.handle("get-full-db", async (event, arg) => loadAllCharacters(event, arg, app))//getFullDB(event, arg, database))
  ipcMain.handle("add-row", async (event, arg) => saveCharacter(event, arg, app))//addRowDB(event, arg, database))
  ipcMain.handle("load-row", async (event, arg) => loadCharacter(event, arg, app))//loadRowDB(event, arg, database))
  ipcMain.handle("change-row", async (event, arg) => updateCharacter(event, arg, app))//changeRowDB(event, arg, database))
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