const fs = require('fs')
const path = require('path')
const { LOG_CONF } = require('../config/db');

//寫日誌
function writeLog(writeStream, log) {
    writeStream.write(log + '\n')
}

//write stream
function createWriteStream(fileName) {
    const fullFileName= path.join(__dirname, '../', '../', 'logs', fileName)
    const writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return writeStream
}

//寫訪問日誌
const accessWriteStream = createWriteStream('access.log')
function access(log) {
    if(LOG_CONF) {
        console.log(log)
        return
    }
    writeLog(accessWriteStream, log)
}

// //寫錯誤日誌
// const errorWriteStream = createWriteStream('errors.log')
// function error(log) {
//     writeLog(errorWriteStream, log)
// }

// //寫事件日誌
// const eventWriteStream = createWriteStream('event.log')
// function event(log) {
//     writeLog(eventWriteStream, log)
// }

module.exports = {
    access,
    // error,
    // event
}