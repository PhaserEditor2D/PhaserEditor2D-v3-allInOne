const child_process = require("child_process")
const path = require("path")
const userData = require("./userData")
const http = require("http")

/** @type {child_process.ChildProcess} */
let serverProc;

/**
 * Restart the server with the given project path
 * 
 * @param {string} project The project path.
 * @returns void
 */
async function startServer(project) {

    stopServer()

    console.log("Starting Phaser Editor 2D Core server")

    const portConfigKey = `port.${project}`

    const savedPort = userData.getInt(portConfigKey)

    console.log("savedPort " + savedPort)

    const port = await findFreePort(savedPort ?? 1986)

    if (savedPort === undefined) {

        console.log(`Assign port ${port} to ${project}`)
        userData.setValue(portConfigKey, port)
    }

    const fileName = process.platform === "win32" ? "PhaserEditor2D.exe" : "PhaserEditor2D"

    const filePath = path.join(__dirname, `../../server/${fileName}`)

    const args = ["-disable-open-browser", "-port", port, "-project", project]

    console.log(args);

    serverProc = child_process.execFile(filePath, args, {
        windowsHide: true,
    })

    serverProc.on("close", () => {

        console.log("Closed Phaser Editor 2D Core server");
    })

    serverProc.stdout.pipe(process.stdout)
    serverProc.stderr.pipe(process.stderr)

    process.once("exit", () => serverProc.kill("SIGKILL"))

    return port
}

function stopServer() {

    if (serverProc) {

        console.log("Kill server process " + serverProc.pid)
        serverProc.kill("SIGKILL")
    }
}

async function isFreePort(port) {

    return new Promise(resolve => {

        const server = http.createServer()

        server.listen(port, () => {
            server.close()
            resolve(true)
        })

        server.on("error", () => {
            resolve(false)
        })
    })
}

/**
 * Find a free port.
 * 
 * @param {number} portStart 
 */
async function findFreePort(portStart) {

    while (true) {

        if (await isFreePort(portStart)) {

            return portStart
        }

        portStart++
    }
}

module.exports = { startServer, stopServer }