import { SerialPort } from "serialport";
import proces from "node:process";

const startTime = proces.uptime()

async function scanPort () {
    console.log("Sacanning port...\n")
    
    const ports = await SerialPort.list()
        .catch (error => {
            console.log('Scanning failled!')
            console.log(`Error : ${error}`)
            console.log(`Scan execution time : ${proces.uptime() - startTime}s`)
            
            proces.exit()
        }).then (response => {
            console.log("Scanning success!\n")
            return response        
    })

    if (ports.length == 0) {
        return console.log("Port not found\n");
    }
    
    console.log('Available ports:\n');
    ports.forEach(port => {
        console.log(`===================================`)

        console.log(`port name     : ${port.friendlyName || 'N/A'}`)
        console.log(`manufacturer  : ${port.manufacturer || 'N/A'}`)
        console.log(`serial number : ${port.serialNumber || 'N/A'}`)
        console.log(`location      : ${port.locationId || 'N/A'}`)
        console.log(`product id    : ${port.vendorId}.${port.productId} `)
        
        console.log(`===================================\n`)
    })
}

await scanPort();

console.log(`Scan execution time : ${proces.uptime() - startTime}s`)