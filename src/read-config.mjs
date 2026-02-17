import * as fs from "node:fs/promises"
import process from "node:process"

const relativePath = process.cwd() 
const fileName = "config-port.json"

export default async function () {
    const readContent = await fs.readFile(`${relativePath}/${fileName}` , {encoding : 'utf8'})
        .catch (error => {
            console.log("Failled executiion...")
            return [error , false]
    })
    const dataParse = JSON.parse(readContent)

    return ([dataParse["deffault-config"] , dataParse["port-config"]])

}