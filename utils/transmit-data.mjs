import * as readline from "node:readline/promises";
import process from "node:process";

import { SerialPort } from "serialport";
import readConfig from "../src/read-config.mjs";

const rlConfig = {
    input : process.stdin,
    output : process.stdout
}
const rlInterface = readline.createInterface(rlConfig)

console.log("Open transmit UART terminal...\n")

const [deffaultConfig , portConfig] = await readConfig()
const checkConfiguration = portConfig.path  || portConfig.baudRate

const port = new SerialPort (checkConfiguration ? portConfig : deffaultConfig)

if (!port.opening) {
    console.log(`Open port ${port.path} with baudrate ${port.baudRate}...\n`)
    
    const openPort_promise = new Promise(function(resolve , reject) {
        port.open(function (error) {
            if (error) {
                reject(error)
            } else {
                resolve()
            }
        })
    }) 
    await openPort_promise.then(response => {
            console.log("Port has been open")
            rlInterface.prompt()
        })
        .catch(error => {
            console.log(`Failled to open port ${port.path}`)
            console.log(error.message)
            process.exit()
        })
}

rlInterface.on('line' , function (line) {
    if (line == "exit") {
        port.close()
        console.log("Exit transmit terminal.")
        return rlInterface.close()
    }
    port.write(line + '\n');
    console.log(`Transmit message : ${line}\n`)
    rlInterface.prompt()
})