const fs = require('fs');
const path = require('path');

const fileName = path.resolve(__dirname, './file/data.txt');

// //讀取文件
// fs.readFile(fileName, (err, data) => {
// 	if(err) {
// 		console.log(err);
// 		return;
// 	}
// 	//轉換為字符串
// 	console.log(data.toString());
// });

// //寫入文件
// const content = 'WRITTED';
// const opt = {
// 	flag: 'a'	//追加寫入，覆蓋用w
// }
// fs.writeFile(fileName, content, opt, (err) => {
// 	if(err) {
// 		console.log(err);
// 	}

// });

// //判斷文件是否存在
// fs.exists(fileName, (exists) => {
// 	console.log(exists);
// });