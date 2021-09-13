const { app, BrowserWindow } = require("electron")
const { WindowManager } = require("./windowManager")

function startElectron() {

    app.whenReady().then(() => new WindowManager())

    app.on("window-all-closed", () => {

        process.exit()
    })

    app.on("activate", () => {

        if (BrowserWindow.getAllWindows().length === 0) {

            new WindowManager()
        }
    })
}

module.exports = startElectron