import { ChildProcess } from "child_process"
import { app, BrowserWindow, dialog, ipcMain, Menu, nativeImage } from "electron"
import { IpcMainEvent } from "electron"
import { existsSync, mkdirSync, statSync } from "fs"
import { homedir } from "os"
import { join } from "path"
import copy from "recursive-copy"
import { startServer } from "./startServer"
import { userData } from "./userData"
import { downloadAndUnzip } from "./downloads"
import { env } from "process"

export class WindowManager {

    private static count = 0

    private win: BrowserWindow
    private _serverProc?: ChildProcess

    constructor(windowProjectPath?: string) {

        WindowManager.count++

        this.win = new BrowserWindow({
            width: 1200 + Math.floor(Math.random() * 200),
            height: 800 + Math.floor(Math.random() * 200),
            center: false,
            autoHideMenuBar: true,
            show: true,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: join(__dirname, "preload.js")
            }
        })

        this.createMenu()

        if (process.platform === "linux") {

            const icon = nativeImage.createFromPath(join(__dirname, "../../linux-assets/icon.png"))
            this.win.setIcon(icon)
        }

        const ipcMainListener = async (event: IpcMainEvent, arg: any) => {

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
                        type: "question",
                        buttons: ["Leave", "Stay"],
                        title: "Do you want to leave?",
                        message: "Changes you made may not be saved.",
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
                            defaultPath: windowProjectPath || homedir()
                        })

                        dir = result ? result.filePaths[0] : undefined
                    }

                    this.openProject(dir)

                    break
                }

                case "close-project": {

                    userData.deleteProjectPath()

                    this.loadHomePage()

                    this.killServerProcess()

                    break
                }

                case "marketplace-config": {

                    const marketplaceUrl = env.PHASEREDITOR_MARKETPLACE_URL
                        || "https://marketplace.phasereditor2d.com"

                    console.log(`Marketplace URL: ${marketplaceUrl}`)

                    event.returnValue = { marketplaceUrl }

                    break
                }

                case "create-project": {

                    try {

                        const result = await dialog.showOpenDialog(this.win, {
                            message: "Select Project Path",
                            properties: ["openDirectory", "createDirectory", "promptToCreate"],
                            defaultPath: windowProjectPath
                        })

                        if (!result.canceled) {

                            this.win.loadFile("src/html/loading.html")

                            const dir = result.filePaths[0]

                            mkdirSync(dir, { recursive: true })

                            if (body.builtin) {

                                console.log("Copying built-in template...")

                                const src = join(app.getAppPath(), "starter-templates", body.repo)

                                await copy(src, dir, {
                                    dot: true,
                                    overwrite: false,
                                    results: false,
                                })

                                console.log("Done.")

                            } else {

                                console.log("Fetching template from marketplace...")

                                await downloadAndUnzip(body.zip_url, dir)

                                console.log("Done.")
                            }

                            this.openProject(dir)
                        }

                    } catch (e) {

                        console.log(e)

                        dialog.showErrorBox("Error", (e as Error).message)

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

            this.killServerProcess()
        })

        if (windowProjectPath
            && existsSync(windowProjectPath)
            && statSync(windowProjectPath).isDirectory()) {

            this.openProject(windowProjectPath)

        } else {

            this.loadHomePage()
        }
    }

    private killServerProcess() {

        if (this._serverProc) {

            console.log(`Kill server proc ${this._serverProc.pid}`)

            this._serverProc.kill("SIGKILL")
            this._serverProc = undefined

        } else {

            console.log("No server process to kill.")
        }
    }

    clearList() {

        userData.clearRecentProjects()

        app.clearRecentDocuments()
    }

    loadHomePage() {

        this.win.loadFile("src/html/start.html")
    }

    loadNewProjectPage() {

        this.win.loadFile("src/html/newProject.html")
    }

    async openProject(project: string) {

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

        const { port, proc } = await startServer(project)

        this._serverProc = proc

        const url = `http://127.0.0.1:${port}/editor/`

        setTimeout(() => this.win.loadURL(url), 500)

        app.addRecentDocument(project);

        userData.setProjectPath(project)
        userData.incrementRecentProject(project)

        return true
    }

    createMenu() {

        const isMac = process.platform === "darwin"

        const template: any = [
            // { role: "appMenu" }
            ...(isMac ? [{
                label: "Phaser Editor 2D",
                submenu: [
                    { role: "about" },
                    { type: "separator" },
                    { role: "services" },
                    { type: "separator" },
                    { role: "hide" },
                    { role: "hideothers" },
                    { role: "unhide" },
                    { type: "separator" },
                    { role: "quit" }
                ]
            }] : []),
            // { role: "fileMenu" }
            {
                label: "File",
                submenu: [
                    isMac ? { role: "close" } : { role: "quit" }
                ]
            },

            // { role: "editMenu"}
            {
                label: "Edit",
                submenu: [
                    { role: "undo" },
                    { role: "redo" },
                    { type: "separator" },
                    { role: "cut" },
                    { role: "copy" },
                    { role: "paste" },
                    ...(isMac ? [
                        { role: "pasteAndMatchStyle" },
                        { role: "delete" },
                        { role: "selectAll" },
                        { type: "separator" },
                        {
                            label: "Speech",
                            submenu: [
                                { role: "startSpeaking" },
                                { role: "stopSpeaking" }
                            ]
                        }
                    ] : [
                        { role: "delete" },
                        { type: "separator" },
                        { role: "selectAll" }
                    ])
                ]
            },

            // { role: "viewMenu" }
            {
                label: "View",
                submenu: [
                    { role: "reload" },
                    { role: "forceReload" },
                    { role: "toggleDevTools" },
                    { type: "separator" },
                    { role: "resetZoom" },
                    { role: "zoomIn" },
                    { role: "zoomOut" },
                    { type: "separator" },
                    { role: "togglefullscreen" }
                ]
            },
            // { role: "windowMenu" }
            {
                label: "Window",
                submenu: [
                    { role: "minimize" },
                    { role: "zoom" },
                    ...(isMac ? [
                        { type: "separator" },
                        { role: "front" },
                        { type: "separator" },
                        { role: "window" }
                    ] : [
                        { role: "close" }
                    ])
                ]
            }
        ]

        const menu = Menu.buildFromTemplate(template)

        Menu.setApplicationMenu(menu)
    }
}