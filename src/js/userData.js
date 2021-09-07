const os = require("os")
const path = require("path")
const fs = require("fs")

class UserData {

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
     * Get a settings value.
     * 
     * @param {string} key 
     * @returns {string}
     */
    getString(key) {

        return this.#data[key];
    }

    /**
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
     * 
     * @param {string} key 
     * @param {any} value 
     */
    setValue(key, value) {

        this.#data[key] = value

        fs.writeFileSync(this.#settingsFile, JSON.stringify(this.#data, null, 4))
    }

}

module.exports = new UserData()