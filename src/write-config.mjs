import * as fs from "node:fs/promises"
import process from "node:process"

const relativePath = process.cwd() 
const fileName = "config-port.json"

export default async function (deffaultConfig , portConfig) {
    const rawObject = {
        "deffault-config" : deffaultConfig,
        "port-config" : portConfig
    }
    const stringifyObject = JSON.stringify(rawObject)
    
    const config = {encoding : "utf-8"}
    
    const writer = await fs.writeFile(`${relativePath}/${fileName}` , stringifyObject , config)
        .then(response => true)
        .catch(error => false)

    return writer;
}
