const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require("path");
const { exit } = require('process');

function createWindow() {

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, "preload.js")
        }
    })

    /* win.webContents.on('will-prevent-unload', (event) => {

        // TODO: we should send a message to the render process if we want to close the window.

        
    })
    */

    ipcMain.on("electron-phasereditor2d", (event, arg) => {

        switch (arg) {

            case "ask-close-window":

                const choice = dialog.showMessageBoxSync(win, {
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
        }
    });

    win.loadURL("http://127.0.0.1:1959/editor/")
    //win.webContents.openDevTools()

}

function exitApp() {

    if (process.platform !== 'darwin') {

        exit();
    }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {

    exitApp();
})

app.on("will-quit", () => {

    console.log("will quit")
});

app.on('activate', () => {

    if (BrowserWindow.getAllWindows().length === 0) {

        createWindow()
    }
})
