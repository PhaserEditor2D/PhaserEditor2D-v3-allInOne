import { https } from "follow-redirects"
import { createWriteStream, existsSync, mkdirSync, renameSync, unlink } from "fs"
import AdmZip from "adm-zip"
import { createHash, randomUUID } from "crypto"
import { getUserDataFolder } from "./userData";
import { dirname, join } from "path";


export async function downloadWithCache(url: string) {

    const dir = getUserDataFolder(true)

    const cacheDir = join(dir, "cache")

    const hash = createHash("md5").update(url).digest("hex")

    const zipFile = join(cacheDir, `${hash}.zip`)

    if (existsSync(zipFile)) {

        console.log(`Get from cache ${zipFile}`)

        return zipFile
    }

    mkdirSync(cacheDir, { recursive: true })

    await download(url, zipFile)

    return zipFile
}

export function getTempFilePath(sufix: string) {

    const dataDir = getUserDataFolder(true);

    const tmpFolder = join(dataDir, "tmp");

    mkdirSync(tmpFolder, { recursive: true })

    const filename = randomUUID() + sufix

    return join(tmpFolder, filename);
}

export async function downloadAndUnzip(url: string, dstDir: string) {

    const zipFile = await downloadWithCache(url)

    unzipFile(zipFile, dstDir);
}

export function download(url: string, dstFile: string) {

    const tmpFile = getTempFilePath(".zip")

    console.log(`Fetching ${url} to ${tmpFile}...`)

    return new Promise((resolve, reject) => {

        https.get(url, function (response) {

            const { statusCode } = response

            if (statusCode !== 200) {

                reject(new Error(`[statusCode ${statusCode}] Network error downloading ${url}`))
            }

            const file = createWriteStream(tmpFile);
            
            response
                .pipe(file)
                .on("error", () => {

                    reject(new Error("Cannot write to file"))
                })

            file.on("finish", function () {

                console.log(`Move temporal file to ${dstFile}`)

                renameSync(tmpFile, dstFile)

                resolve(undefined)

            }).on("error", () => {

                reject(new Error("Cannot write to file"))
            })

        }).on("error", err => {

            reject(err)
        });
    })
}

export function unzipFile(zipFile: string, dstDir: string, skipRootFolder = true) {

    console.log(`Unzipping ${zipFile} to ${dstDir}`)

    const zip = new AdmZip(zipFile)

    if (skipRootFolder) {

        for (const entry of zip.getEntries()) {

            const relname = entry.entryName.split("/").slice(1).join("/")

            if (entry.isDirectory) {

                const newFolder = join(dstDir, relname)

                console.log(`mkdir '${newFolder}'`)

                mkdirSync(newFolder, { recursive: true })

            } else {

                const newFolder = join(dstDir, dirname(relname))

                console.log(`extracting '${entry.entryName}' to '${newFolder}'`)

                zip.extractEntryTo(entry, newFolder, false, true)
            }
        }

    } else {

        zip.extractAllTo(dstDir, true, true)
    }
}