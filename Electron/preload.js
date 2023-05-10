const {
    ipcRenderer,
    contextBridge
} = require("electron")


contextBridge.exposeInMainWorld("api", {
    buttonInteraction: (button) => ipcRenderer.send("button-interaction", button)
})