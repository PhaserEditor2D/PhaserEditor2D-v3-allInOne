const child_process = require("child_process");
const getPort = require("get-port");
const path = require("path");
const userData = require("./userData");

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

    const port = await getPort({
        port: getPort.makeRange(savedPort ?? 1995, 2020)
    })

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

module.exports = { startServer, stopServer }