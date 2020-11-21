const child_process = require("child_process")
const path = require("path")

function startServer() {

    const fileName = process.platform === "win32" ? "PhaserEditor2D.exe" : "PhaserEditor2D"

    const filePath = path.join(__dirname, `server/${fileName}`)

    console.log("")
    console.log("Starting Phaser Editor 2D server: " + filePath)

    const proc = child_process.execFile(filePath, ["-disable-open-browser", "-disable-gzip", "-port", "1995", "-disable-check-for-updates"], {
        windowsHide: true
    })

    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)

    return proc
}

module.exports = startServer