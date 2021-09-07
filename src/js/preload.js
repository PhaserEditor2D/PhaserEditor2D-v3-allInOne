console.log("Welcome Electron!")

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    'electron', {

    sendMessage: msg => ipcRenderer.send("electron-phasereditor2d", msg),

    sendMessageSync: msg => ipcRenderer.sendSync("electron-phasereditor2d", msg)
})