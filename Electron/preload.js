const { ipcRenderer, contextBridge } = require("electron")



contextBridge.exposeInMainWorld("api", {
    buttonInteraction: (button) => ipcRenderer.send("button-interaction", button),
    getFullDB: (message) => ipcRenderer.invoke("get-full-db", message),
    addRow: (message) => ipcRenderer.invoke("add-row", message),
    loadRow: (message) => ipcRenderer.invoke("load-row", message),
    changeRow: (message) => ipcRenderer.invoke("change-row", message),
})