const child_process = require("child_process")
const path = require("path")

/** @type {child_process.ChildProcess} */
let serverProc;

/**
 * Restart the server with the given project path
 * 
 * @param {string} project The project path.
 * @returns void
 */
function startServer(project) {

    if (serverProc) {

        serverProc.kill("SIGKILL")
    }

    const fileName = process.platform === "win32" ? "PhaserEditor2D.exe" : "PhaserEditor2D"

    const filePath = path.join(__dirname, `server/${fileName}`)

    console.log("")
    console.log("Starting Phaser Editor 2D server: " + filePath)

    serverProc = child_process.execFile(filePath, ["-disable-open-browser", "-port", "1995", "-project", project], {
        windowsHide: true
    })

    serverProc.stdout.pipe(process.stdout)
    serverProc.stderr.pipe(process.stderr)
}

module.exports = startServer