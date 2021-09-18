console.log("Welcome Electron!")

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    'electron', {

    sendMessage: (msg: any) => ipcRenderer.send("electron-phasereditor2d", msg),

    sendMessageSync: (msg: any) => ipcRenderer.sendSync("electron-phasereditor2d", msg)
})