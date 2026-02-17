import { SerialPort } from "serialport";
import readConfig from "../src/read-config.mjs";
import { ReadlineParser } from "@serialport/parser-readline";

console.log("Open recive UART terminal...\n")

const [deffaultConfig , portConfig] = await readConfig()
const checkConfiguration = portConfig.path  || portConfig.baudRate

const port = new SerialPort (checkConfiguration ? portConfig : deffaultConfig)
// const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

port.on('data' , function(data) {
    console.log(`📥 [${new Date().toLocaleTimeString()}] ${data}`);
})

// parser.on('data', (data) => {
//     console.log(`📥 [${new Date().toLocaleTimeString()}] ${data}`);
// });

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
            console.log("Port has been open\n")

            console.log("Waiting for recive data...\n")
        })
        .catch(error => {
            console.log(`Failled to open port ${port.path}`)
            console.log(error.message)
            process.exit()
    })
}


