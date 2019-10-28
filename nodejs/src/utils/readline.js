const fs = require('fs')
const path = require('path')
const readline = require('readline')
const { LOG_CONF } = require('../config/db');

//文件名
const fileName= path.join(__dirname, '../', '../', 'logs', 'access.log')
//read Stream
const readStream = fs.createReadStream(fileName)
//readline
const readline = fs.createInterface({
    input: readStream
})

let chromeNum = 0
let sum = 0

readline.on('line',  (lineData) => {
    if(!lineData) {
        return
    }

    //總行數
    sum++

    const arr = lineData.split(' -- ')
    if(arr[2] && arr[2].indexOf('Chrome') > 0) {
        //累加chrome數量
        chromeNum++
    }
})

readline.on('close', () => {
    console.log('chrome 佔比：'+sum/chromeNum)
})
