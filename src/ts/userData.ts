import { dialog } from "electron";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";

class JSONStore {

    private settingsFile: string;

    private data: any;

    constructor() {

        const settingsDir = join(homedir(), ".phasereditor2d/all-in-one")

        mkdirSync(settingsDir, { recursive: true })

        this.settingsFile = join(settingsDir, "user-data.json")

        this.data = {};

        if (existsSync(this.settingsFile)) {

            const s = readFileSync(this.settingsFile, {
                encoding: "utf-8"
            })

            try {

                this.data = JSON.parse(s.toString())

            } catch (e) {

                console.log(e)

                setTimeout(() => {

                    dialog.showErrorBox("Error", "Error parsing user-data.json: " + (e as Error).message)

                }, 2000)
            }
        }
    }

    getValue(key: string) {

        return this.data[key]
    }

    getString(key: string) {

        return this.data[key] as string
    }

    getInt(key: string) {

        const value = this.data[key]

        if (Number.isInteger(value)) {

            return value
        }

        return undefined
    }

    getStringArray(key: string) {

        let val = this.data[key]

        if (!val) {

            this.data[key] = val = []
        }

        return val;
    }

    setValue(key: string, value: any) {

        this.data[key] = value

        this.save()
    }

    deleteValue(key: string): void {

        delete this.data[key]

        this.save()
    }

    private save() {

        writeFileSync(this.settingsFile, JSON.stringify(this.data, null, 4), {
            encoding: "utf-8"
        })
    }
}


export const store = new JSONStore()

class UserData {

    getProjectPath() {

        return store.getString("projectPath")
    }

    setProjectPath(project: string) {

        store.setValue("projectPath", project)
    }

    deleteProjectPath() {

        store.deleteValue("projectPath")
    }

    getProjectPort(project: string) {

        const ports = store.getValue("ports") || {}

        return ports[project]
    }

    setProjectPort(project: string, port: number) {

        const ports = store.getValue("ports") || {}

        ports[project] = port

        store.setValue("ports", ports)
    }

    getRecentProjects() {

        const recentProjects = store.getValue("recentProjects") || {}

        const projects = Object.keys(recentProjects)

        projects.sort((a, b) => recentProjects[b] - recentProjects[a])

        return projects
    }

    clearRecentProjects() {

        store.setValue("recentProjects", {})
    }

    incrementRecentProject(project: string) {

        const recentProjects = store.getValue("recentProjects") || {}

        recentProjects[project] = Date.now()

        store.setValue("recentProjects", recentProjects)
    }

    deleteRecentProject(project: string) {

        const data = (store.getValue("recentProjects") || {})
        delete data[project]
        store.setValue("recentProjects", data)
    }
}

export const userData = new UserData()