const { Menu } = require("electron");
const electron = require("electron")
const path = require("path");
const process = require("process")
const startServer = require("./startServer")
const config = require("./config");
const { settings } = require("cluster");

/** @type {string} */
let projectPath = config.getString("projectPath")

function createWindow() {

    const win = new electron.BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, "preload.js")
        }
    })

    createMenu()

    if (process.platform === "linux") {

        const icon = electron.nativeImage.createFromPath(path.join(__dirname, "linux-assets/icon.png"));
        win.setIcon(icon);
    }

    electron.ipcMain.on("electron-phasereditor2d", (event, arg) => {

        const method = arg.method;
        const body = arg.body;

        switch (method) {

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
                    properties: ["openDirectory"],
                    defaultPath: projectPath
                });

                const dir = result ? result[0] : undefined;

                if (dir) {

                    startServer(dir)
                    
                    win.loadURL("http://127.0.0.1:1995/editor/")

                    projectPath = dir;
                    settings.setItem("projectPath", projectPath)
                }

                break;

            case "open-dev-tools":

                win.webContents.openDevTools({
                    mode: "bottom"
                });

                break;
        }
    });

    win.loadFile("src/html/start.html")
}

function createMenu() {

    const isMac = process.platform === 'darwin'

    const template = [
        // { role: 'appMenu' }
        ...(isMac ? [{
            label: "Phaser Editor 2D",
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services' },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideothers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        }] : []),
        // { role: 'fileMenu' }
        {
            label: 'File',
            submenu: [
                isMac ? { role: 'close' } : { role: 'quit' }
            ]
        },

        // { role: 'editMenu'}
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                ...(isMac ? [
                    { role: 'pasteAndMatchStyle' },
                    { role: 'delete' },
                    { role: 'selectAll' },
                    { type: 'separator' },
                    {
                        label: 'Speech',
                        submenu: [
                            { role: 'startSpeaking' },
                            { role: 'stopSpeaking' }
                        ]
                    }
                ] : [
                    { role: 'delete' },
                    { type: 'separator' },
                    { role: 'selectAll' }
                ])
            ]
        },

        // { role: 'viewMenu' }
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        // { role: 'windowMenu' }
        {
            label: 'Window',
            submenu: [
                { role: 'minimize' },
                { role: 'zoom' },
                ...(isMac ? [
                    { type: 'separator' },
                    { role: 'front' },
                    { type: 'separator' },
                    { role: 'window' }
                ] : [
                    { role: 'close' }
                ])
            ]
        }
    ]

    const menu = Menu.buildFromTemplate(template)

    Menu.setApplicationMenu(menu)
}

function exitApp() {

    // if (process.platform !== 'darwin') {

    //     process.exit();
    // }

    process.exit();
}

function startElectron() {

    electron.app.whenReady().then(createWindow)

    electron.app.on('window-all-closed', () => {

        exitApp()
    })

    electron.app.on('activate', () => {

        if (electron.BrowserWindow.getAllWindows().length === 0) {

            createWindow()
        }
    })
}

module.exports = startElectron