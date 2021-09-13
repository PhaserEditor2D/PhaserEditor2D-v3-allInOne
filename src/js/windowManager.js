const { BrowserWindow, Menu, dialog, app, nativeImage, ipcMain } = require("electron")
const path = require("path")
const process = require("process")
const { startServer, stopServer } = require("./startServer")
const { userData } = require("./userData")
const { existsSync, statSync, mkdirSync } = require("fs")
const { homedir } = require("os")
const copy = require("recursive-copy")
const { join } = require("path")
/** @type {string} */
let projectPath = userData.getProjectPath()

class WindowManager {

    static count = 0

    /** @type BrowserWindow */
    win

    constructor() {

        WindowManager.count++

        this.win = new BrowserWindow({
            width: 1200 + Math.floor(Math.random() * 200),
            height: 800 + Math.floor(Math.random() * 200),
            center: false,
            autoHideMenuBar: true,
            show: false,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                enableRemoteModule: false,
                preload: path.join(__dirname, "preload.js")
            }
        })

        this.win.once("ready-to-show", () => this.win.show())

        this.createMenu()

        if (process.platform === "linux") {

            const icon = nativeImage.createFromPath(path.join(__dirname, "../../linux-assets/icon.png"))
            this.win.setIcon(icon)
        }

        const ipcMainListener = async (event, arg) => {

            if (event.sender !== this.win.webContents) {

                return
            }

            console.log("ipcMain.on:")
            console.log(arg)

            const method = arg.method
            const body = arg.body || {}

            switch (method) {

                case "ask-close-window": {

                    const choice = await dialog.showMessageBox(this.win, {
                        type: 'question',
                        buttons: ['Leave', 'Stay'],
                        title: 'Do you want to leave?',
                        message: 'Changes you made may not be saved.',
                        defaultId: 0,
                        cancelId: 1
                    })

                    console.log(choice)

                    const leave = (choice.response === 0)

                    if (leave) {

                        console.log("close window")
                        this.win.destroy()
                    }

                    break
                }

                case "new-window": {

                    new WindowManager()

                    break
                }

                case "clear-list": {

                    this.clearList()

                    break
                }

                case "show-new-project-page": {

                    this.loadNewProjectPage()

                    break
                }

                case "open-project": {

                    let dir = body.project

                    if (dir === undefined) {

                        const result = await dialog.showOpenDialog(this.win, {
                            message: "Select Folder",
                            properties: ["openDirectory", "createDirectory", "promptToCreate"],
                            defaultPath: projectPath
                        })

                        dir = result ? result.filePaths[0] : undefined
                    }

                    this.openProject(dir)

                    break
                }

                case "close-project": {

                    userData.deleteProjectPath()

                    this.loadHomePage()

                    stopServer()

                    break
                }

                case "create-project": {

                    try {

                        const result = await dialog.showOpenDialog(this.win, {
                            message: "Select Project Path",
                            properties: ["openDirectory", "createDirectory", "promptToCreate"],
                            defaultPath: projectPath || homedir()
                        })

                        if (!result.canceled) {

                            this.win.loadFile("src/html/loading.html")

                            dir = result.filePaths[0]

                            mkdirSync(dir, { recursive: true })

                            const src = join(app.getAppPath(), "starter-templates", body.repo)

                            await copy(src, dir, {
                                dot: true,
                                overwrite: false,
                                results: false,
                            })

                            this.openProject(dir)
                        }

                    } catch (e) {

                        dialog.showErrorBox("Error", e.message)
                        this.loadHomePage()
                    }

                    break
                }

                case "recent-projects": {

                    const projects = userData.getRecentProjects()

                    event.returnValue = projects

                    break
                }

                case "open-dev-tools": {

                    this.win.webContents.openDevTools({
                        mode: "bottom"
                    })

                    break
                }
            }
        }

        ipcMain.on("electron-phasereditor2d", ipcMainListener)

        this.win.once("closed", () => {

            ipcMain.removeListener("electron-phasereditor2d", ipcMainListener)
            WindowManager.count--
        })

        if (WindowManager.count === 1 && projectPath && existsSync(projectPath) && statSync(projectPath).isDirectory()) {

            this.openProject(projectPath)

        } else {

            this.loadHomePage()
        }
    }

    clearList() {

        userData.clearRecentProjects()
    }

    loadHomePage() {

        this.win.loadFile("src/html/start.html")
    }

    loadNewProjectPage() {

        this.win.loadFile("src/html/newProject.html")
    }

    async openProject(project) {

        if (!project) {

            return
        }

        if (!existsSync(project) || !statSync(project).isDirectory()) {

            dialog.showMessageBox(this.win, {
                type: "question",
                buttons: ["Close"],
                title: "File not found",
                message: `File "${project}" does not exist or is not a directory.`,
                defaultId: 0,
                cancelId: 1
            })

            userData.deleteRecentProject(project)
            userData.deleteProjectPath()

            this.loadHomePage()

            return
        }

        const port = await startServer(project)

        const url = `http://127.0.0.1:${port}/editor/`

        setTimeout(() => this.win.loadURL(url), 500)

        projectPath = project
        userData.setProjectPath(projectPath)
        userData.incrementRecentProject(project)

        return true
    }

    createMenu() {

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

    exitApp() {

        process.exit()
    }
}

module.exports = { WindowManager }