const os = require("os")
const path = require("path")
const fs = require("fs");
const { prototype } = require("events");

class JSONStore {

    /** @type {string} */
    #settingsFile;

    /** @type {any} */
    #data;

    constructor() {

        const settingsDir = path.join(os.homedir(), ".phasereditor2d/all-in-one")

        fs.mkdirSync(settingsDir, { recursive: true })

        this.#settingsFile = path.join(settingsDir, "user-data.json")

        this.#data = {};

        if (fs.existsSync(this.#settingsFile)) {

            const s = fs.readFileSync(this.#settingsFile)
            this.#data = JSON.parse(s)
        }
    }

    /**
     * Get the value for the given key.
     * 
     * @param {String} key 
     * @returns 
     */
    getValue(key) {

        return this.#data[key]
    }

    /**
     * Get the string value for the given key.
     * 
     * @param {string} key 
     * @returns {string}
     */
    getString(key) {

        return this.#data[key]
    }

    /**
     * Get the integer value for the given key.
     * 
     * @param {string} key 
     * @returns {number}
     */
    getInt(key) {

        const value = this.#data[key]

        if (Number.isInteger(value)) {

            return value
        }

        return undefined
    }

    /**
     * Get the string array value for the given key.
     * 
     * @param {string} key 
     * @returns {string[]}
     */
    getStringArray(key) {

        let val = this.#data[key]

        if (!val) {

            this.#data[key] = val = []
        }

        return val;
    }

    /**
     * Set the value. Changes are persisted.
     * 
     * @param {string} key 
     * @param {any} value 
     */
    setValue(key, value) {

        this.#data[key] = value

        this.#save()
    }

    /**
     * Delete the key. Changes are persisted.
     * 
     * @param {string} key 
     */
    deleteValue(key) {

        delete this.#data[key]

        this.#save()
    }

    #save() {

        fs.writeFileSync(this.#settingsFile, JSON.stringify(this.#data, null, 4))
    }
}


const store = new JSONStore()

class UserData {

    /**
     * Get the default project path.
     * 
     * @returns {string}
     */
    getProjectPath() {

        return store.getString("projectPath")
    }

    /**
     * Set the default project path.
     * 
     * @param {string} project 
     */
    setProjectPath(project) {

        store.setValue("projectPath", project)
    }

    /**
     * Delete the project from the user data.
     */
    deleteProjectPath() {

        store.deleteValue("projectPath")
    }

    /**
     * Get the port associated to the given project.
     * 
     * @param {string} project 
     * @returns {number}
     */
    getProjectPort(project) {

        const ports = store.getValue("ports") || {}

        return ports[project]
    }

    /**
     * Set the port for the given project.
     * 
     * @param {string} project 
     * @param {number} port 
     */
    setProjectPort(project, port) {

        const ports = store.getValue("ports") || {}

        ports[project] = port

        store.setValue("ports", ports)
    }

    /**
     * Get the last open projects. The result is sorted, the first project is the most open project.
     * 
     * @returns {string[]}
     */
    getRecentProjects() {

        const recentProjects = store.getValue("recentProjects") || {}

        const projects = Object.keys(recentProjects)

        projects.sort((a, b) => recentProjects[b] - recentProjects[a])

        return projects
    }

    incrementRecentProject(project) {

        const recentProjects = store.getValue("recentProjects") || {}

        recentProjects[project] = Date.now()

        store.setValue("recentProjects", recentProjects)
    }

    deleteRecentProject(project) {

        const data = (store.getValue("recentProjects") || {})
        delete data[project]
        store.setValue("recentProjects", data)
    }
}

module.exports = {
    store,
    userData: new UserData()
}