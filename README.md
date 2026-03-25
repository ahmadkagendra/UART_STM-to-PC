# UART STM to PC via USB TTL
UART is a type of serial communication between devices for exchanging data. UART itself stands for `Universal Asynchronous Receiver Transmitter`.
This repository contains documentation for UART communication between an STM32 and a PC via USB TTL, using JavaScript and C as the base languages.

### Required Knowledge : 
- Bassic Javascript
- Node Js
- NPM
- STM32

### Function : 
- Data Tranmiter
- Data Reciver
- Data Frame Debuger 

# Quick Start

## Instalation :
Before using the functionality, it is necessary to install the NPM package.
```cmd
$ npm install --save-dev
```
Make sure the package has been successfully installed.

## Scan and Configuration :
- #### Scan Port
  
After the package is successfully installed, the application can be used. Scan USB ports to detect ports that are read on the computer/PC.
```cmd
$ npm run scan
```
That code open file `./utils/scan-port.mjs`
- #### Configuration Port

Berofe use transmit and recive functionality, it is necessary to configure the port according to the port you want to access.

```cmd
$ npm start
```
That code open file `./index.mjs`

##### Configuration Note :
  - `Bautrate`
  - `Port Name`

## Transmit and Recive : 
- #### Transmit
To use transmit functionality on the UART bus. `Make sure the port is accessible`
```git
$ npm run transmit
```
That code open file `./utils/transmit-data.mjs`

Type data on the command line to send UART data.

- #### Recive
To use recive functionality on the UART bus. `Make sure the port is accessible`
```git
$ npm run transmit
```
That code open file `./utils/recive-data.mjs`

## Explained Code : 
- Main script : [index.mjs](docs/index.mjs)
- Utility Script : [recive-data.mjs](docs/recive-data.mjs) , [transmit-data.mjs](docs/transmit-data.mjs) , [scan-port.mjs](docs/scan-port.mjs)
- Source Script : [read-configuration.mjs](docs/read-config.mjs) , [write-configuration.mjs](docs/write-config.mjs)
