const { Menu, dialog, app } = require("electron")
const electron = require("electron")
const path = require("path")
const process = require("process")
const { startServer, stopServer } = require("./startServer")
const { userData } = require("./userData");
const { existsSync, statSync, mkdirSync } = require("fs")
const { homedir } = require("os")
const copy = require("recursive-copy")
const { resolve, join } = require("path")

/** @type {string} */
let projectPath = userData.getProjectPath()

/** @type {electron.BrowserWindow} */
let appWindow;

async function createWindow() {

    appWindow = new electron.BrowserWindow({
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

        const icon = electron.nativeImage.createFromPath(path.join(__dirname, "../../linux-assets/icon.png"));
        appWindow.setIcon(icon);
    }

    electron.ipcMain.on("electron-phasereditor2d", async (event, arg) => {

        const method = arg.method;
        const body = arg.body || {};

        switch (method) {

            case "ask-close-window": {

                const choice = await electron.dialog.showMessageBox(appWindow, {
                    type: 'question',
                    buttons: ['Leave', 'Stay'],
                    title: 'Do you want to leave?',
                    message: 'Changes you made may not be saved.',
                    defaultId: 0,
                    cancelId: 1
                })

                const leave = (choice.response === 0)

                if (leave) {

                    appWindow.close();

                    exitApp();
                }

                break
            }

            case "show-new-project-page": {

                loadNewProjectPage()

                break
            }

            case "open-project": {

                let dir = body.project

                if (dir === undefined) {

                    const result = await electron.dialog.showOpenDialog(appWindow, {
                        message: "Select Folder",
                        properties: ["openDirectory", "createDirectory", "promptToCreate"],
                        defaultPath: projectPath
                    });

                    dir = result ? result.filePaths[0] : undefined;
                }

                openProject(dir)

                break
            }

            case "close-project": {

                userData.deleteProjectPath()

                loadHomePage()

                stopServer()

                break
            }

            case "create-project": {

                try {

                    const result = await electron.dialog.showOpenDialog(appWindow, {
                        message: "Select Project Path",
                        properties: ["openDirectory", "createDirectory", "promptToCreate"],
                        defaultPath: projectPath || homedir()
                    });

                    if (!result.canceled) {

                        appWindow.loadFile("src/html/loading.html")

                        dir = result.filePaths[0];

                        mkdirSync(dir, { recursive: true })

                        const src = join(app.getAppPath(), "starter-templates", body.repo)

                        await copy(src, dir, {
                            dot: true,
                            overwrite: false,
                            results: false,
                        })

                        openProject(dir)
                    }

                } catch (e) {

                    dialog.showErrorBox("Error", e.message)
                    loadHomePage()
                }

                break
            }

            case "recent-projects": {

                const projects = userData.getRecentProjects()

                event.returnValue = projects

                break
            }

            case "open-dev-tools": {

                appWindow.webContents.openDevTools({
                    mode: "bottom"
                });

                break;
            }
        }
    });

    if (projectPath && existsSync(projectPath) && statSync(projectPath).isDirectory()) {

        openProject(projectPath)

    } else {

        loadHomePage()
    }
}

function loadHomePage() {

    appWindow.loadFile("src/html/start.html")
}

function loadNewProjectPage() {

    appWindow.loadFile("src/html/newProject.html")
}

async function openProject(project) {

    if (!project) {

        return
    }

    if (!existsSync(project) || !statSync(project).isDirectory()) {

        electron.dialog.showMessageBox(appWindow, {
            type: "question",
            buttons: ["Close"],
            title: "File not found",
            message: `File "${project}" does not exist or is not a directory.`,
            defaultId: 0,
            cancelId: 1
        })

        userData.deleteRecentProject(project)
        userData.deleteProjectPath()

        loadHomePage()

        return
    }

    const port = await startServer(project)

    const url = `http://127.0.0.1:${port}/editor/`

    appWindow.loadURL(url)

    projectPath = project
    userData.setProjectPath(projectPath)
    userData.incrementRecentProject(project)

    return true
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