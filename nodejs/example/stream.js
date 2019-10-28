//標準輸入輸出
// process.stdin.pipe(process.stdout)

// const http = require('http')

// const server = http.createServer((req, res) => {
//     if(method === 'POST') {
// 		req.pipe(res)
//     }
// })

// server.listen(8000)



// const fs = require('fs')
// const path = require('path')

// //兩文件名
// const file1 =  path.resolve(__dirname, 'file/data.txt')
// const file2 =  path.resolve(__dirname, 'file/data-bak.txt')

// //讀取文件的stream物件
// const readStream = fs.createReadStream(file1)
// const writeStream = fs.createWriteStream(file2)

// //copy，通過pipe
// readStream.pipe(writeStream)

// readStream.on('data', chunk => {
//     console.log(chunk.toString())
// })

// //資料讀取完成，即copy完成
// readStream.on('end', function () {
//     console.log('copyed!')
// })



const http = require('http')
const fs = require('fs')
const path = require('path')

const file1 =  path.resolve(__dirname, 'file/data.txt')
const server = http.createServer((req, res) => {
    if(req.method === 'GET') {
        const readStream = fs.createReadStream(file1)
		readStream.pipe(res)
    }
})

server.listen(8000)
