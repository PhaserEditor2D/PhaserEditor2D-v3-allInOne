"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startElectron = void 0;
var electron_1 = require("electron");
var windowManager_1 = require("./windowManager");
function startElectron() {
    electron_1.app.whenReady().then(function () { return new windowManager_1.WindowManager(); });
    electron_1.app.on("window-all-closed", function () {
        process.exit();
    });
    electron_1.app.on("activate", function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            new windowManager_1.WindowManager();
        }
    });
}
exports.startElectron = startElectron;
