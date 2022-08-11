import { app, BrowserWindow, Menu } from "electron";
import { WindowManager } from "./windowManager";
import { userData } from "./userData"
import { argv, exit } from "process";
import { existsSync, statSync } from "fs";

app.whenReady().then(() => {

    if (process.platform === "darwin" || process.platform === "win32") {

        const dockMenu = Menu.buildFromTemplate([
            {
                label: "New Window",
                click() {

                    new WindowManager()
                }
            }
        ])

        app.dock.setMenu(dockMenu)
    }
})

app.on("window-all-closed", () => {

    if (process.platform !== "darwin") {

        app.quit()
    }
})

app.on("activate", () => {

    if (BrowserWindow.getAllWindows().length === 0) {

        new WindowManager(userData.getProjectPath())
    }
})

const openProjectFromIcon: string[] = []

app.whenReady().then(() => {

    const projectDir = openProjectFromIcon.pop() || argv[1]

    if (projectDir && existsSync(projectDir) && statSync(projectDir).isDirectory()) {

        console.log("Open project from cmd: " + projectDir)

        new WindowManager(projectDir)

    } else {

        new WindowManager(userData.getProjectPath())
    }
})

app.on("open-file", (e, path) => {

    e.preventDefault()

    if (existsSync(path) && statSync(path).isDirectory()) {

        if (app.isReady()) {

            console.log("Open project " + path)

            new WindowManager(path)

        } else {

            openProjectFromIcon.push(path)
        }
    }
})


