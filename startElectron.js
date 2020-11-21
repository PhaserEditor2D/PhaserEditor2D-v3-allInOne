const electron = require("electron")
const path = require("path");
const process = require("process")

function createWindow() {

    const win = new electron.BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, "preload.js")
        }
    })

    if (process.platform === "linux") {

        const icon = electron.nativeImage.createFromPath(path.join(__dirname, "assets/icon.png"));
        win.setIcon(icon);
    }

    electron.ipcMain.on("electron-phasereditor2d", (event, arg) => {

        switch (arg) {

            case "ask-close-window":

                const choice = electron.dialog.showMessageBoxSync(win, {
                    type: 'question',
                    buttons: ['Leave', 'Stay'],
                    title: 'Do you want to leave?',
                    message: 'Changes you made may not be saved.',
                    defaultId: 0,
                    cancelId: 1
                })

                const leave = (choice === 0)

                if (leave) {

                    win.close();

                    exitApp();
                }

                break;

            case "open-directory":

                const result = electron.dialog.showOpenDialogSync(win, {
                    message: "Select Folder",
                    properties: ["openDirectory"]
                });

                const dir = result ? result[0] : undefined;

                event.returnValue = dir;

                break;
        }
    });

    win.loadURL("http://127.0.0.1:1995/editor/")
}

function exitApp() {

    if (process.platform !== 'darwin') {

        process.exit();
    }
}

function startElectron() {

    electron.app.whenReady().then(createWindow)

    electron.app.on('window-all-closed', () => {

        exitApp()
    })

    electron.app.on('activate', () => {

        if (BrowserWindow.getAllWindows().length === 0) {

            createWindow()
        }
    })
}

module.exports = startElectron