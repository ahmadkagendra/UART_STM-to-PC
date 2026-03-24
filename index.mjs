import * as readline from "node:readline/promises";
import process from "node:process";

import readConfig from "./src/read-config.mjs";
import writeConfig from "./src/write-config.mjs";

const [defaultConfig , portConfig] = await readConfig();

console.log("Now port configuration : \n")

const objectKeys = Object.keys(portConfig)
const normalOrder = [...objectKeys]
const sortKeys = objectKeys.sort((a , b) => b.length - a.length)

normalOrder.forEach(key => {
    let charSpace = []
    let diff = sortKeys[1].length - key.length
    
    Array(diff).fill(null).forEach(element => {
        charSpace.push(" ")
    })

    console.log(`${key}${charSpace.join('')} : ${portConfig[key]}`)
})

console.log('')

const rlConfig = {
    input : process.stdin,
    output : process.stdout
}
const rlInterface = readline.createInterface(rlConfig)

rlInterface.on('close' , function () {
    rlInterface.close()
    console.log("\nExit terinal...")
    process.exit()
})
if (!portConfig.path || !portConfig.baudRate) {
    await rlInterfaceSetConfiguration()
} else {
    await changeQuestion()
}

async function changeQuestion () {
    const change = await rlInterface.question("Are you want to change configuration (y/n) : ")
    const state = change == "y" ? true : false
    
    if (!["y" , "n"].includes(change)) {
        console.log("\nInvalid command\n")
        return await changeQuestion()
    }
    if (state) {
        await rlInterfaceSetConfiguration()
    }
}

async function rlInterfaceSetConfiguration () {
    const config_port = await rlInterface.question("Enter port : ")
    const config_baudRate = await rlInterface.question("Enter baudrate : ")
    const config_autoOpen = await rlInterface.question("Port auto open (true/false): ")

    portConfig.path = config_port
    portConfig.baudRate = Number(config_baudRate)
    portConfig.autoOpen = config_autoOpen == "true" ? true : false

    console.log("\nApply configuration...\n")
    const writerConfig = await writeConfig(defaultConfig , portConfig)
    if (writeConfig) {
        console.log("Configuration successfully applied.\n")
    } else {
        console.log("Configuration failled to apply.\n")
        return await rlInterfaceSetConfiguration()
    }
}

rlInterface.close()
