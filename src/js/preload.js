"use strict";
console.log("Welcome Electron!");
var _a = require('electron'), contextBridge = _a.contextBridge, ipcRenderer = _a.ipcRenderer;
contextBridge.exposeInMainWorld('electron', {
    sendMessage: function (msg) { return ipcRenderer.send("electron-phasereditor2d", msg); },
    sendMessageSync: function (msg) { return ipcRenderer.sendSync("electron-phasereditor2d", msg); }
});
