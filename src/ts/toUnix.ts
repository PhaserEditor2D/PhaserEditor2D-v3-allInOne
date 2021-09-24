export default function toUnix(fullName: string) {

    fullName = fullName.replace(/\\/g, "/")

    fullName = fullName.replace(/(?<!^)\/+/g, "/")

    return fullName
}