import { ChildProcess, execFile, spawn } from "child_process";
import { createServer } from "http";
import { join, normalize } from "path";
import toUnix from "./toUnix";
import { userData } from "./userData";

let serverProc: ChildProcess;

async function startServer(project: string) {

    project = toUnix(project)

    stopServer()

    console.log("Starting Phaser Editor 2D Core server")

    const savedPort = userData.getProjectPort(project)

    console.log("Saved port: " + savedPort)

    const port = await findFreePort(savedPort ?? 1986 + Math.floor(Math.random() * 1024))

    if (savedPort === undefined) {

        console.log(`Assign new port ${port} to ${project}`)
        userData.setProjectPort(project, port)
    }

    const fileName = process.platform === "win32" ? "PhaserEditor2D.exe" : "PhaserEditor2D"

    const filePath = toUnix(normalize(join(toUnix(__dirname), `../../server/${fileName}`)))

    console.log(`Spawn: ${filePath}`)

    const args = [ "-disable-open-browser", "-port", port.toString(), "-project", project]

    console.log(args);

    try {

        serverProc = spawn(filePath, args, {
            windowsHide: true
        })

        console.log(`Process ID: ${serverProc.pid}`)

        serverProc.once("close", (code) => {

            console.log(`Closed Phaser Editor 2D Core server. Exit code (${code}).`);
        })

        serverProc.stdout?.pipe(process.stdout)
        serverProc.stderr?.pipe(process.stderr)

        process.once("exit", code => {
            
            console.log(`Main process exit. Kill server proc (${serverProc.pid}). Exit code (${code}).`)

            serverProc.kill("SIGKILL")
        })

    } catch (e) {

        console.log(e)
    }

    return port
}

function stopServer() {

    if (serverProc) {

        console.log("Kill server process " + serverProc.pid)
        serverProc.kill("SIGKILL")
    }
}

async function isFreePort(port: number) {

    return new Promise(resolve => {

        const server = createServer()

        server.listen(port, () => {
            server.close()
            resolve(true)
        })

        server.on("error", () => {
            resolve(false)
        })
    })
}

async function findFreePort(portStart: number) {

    while (true) {

        if (await isFreePort(portStart)) {

            return portStart
        }

        portStart++
    }
}

export { startServer, stopServer }