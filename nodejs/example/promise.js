const fs = require('fs');
const path = require('path');

// // callback方式獲取一個文件內容
// function getFileContent(fileName, callback) {
// 	const fullFileName = path.resolve(__dirname, 'file', fileName);
// 	fs.readFile(fullFileName, (err, data) => {
// 		if(err) {
// 			console.error(err);
// 			return;
// 		}
// 		callback(
// 			JSON.parse(data.toString())
// 		);
// 	});
// }

// // 測試 callback-hell
// getFileContent('a.json', aData => {
// 	console.log('a data', aData);
// 	getFileContent(aData.next, bData => {
// 		console.log('b data', bData);
// 	});
// });

// promise方式獲取文件內容
function getFileContent(fileName) {
	const promise = new Promise((resolve, reject) => {
		const fullFileName = path.resolve(__dirname, 'file', fileName);
		fs.readFile(fullFileName, (err, data) => {
			if(err) {
				reject(err);
				return;
			}
			resolve(
				JSON.parse(data.toString())
			);
		});
	});
	return promise;
}

getFileContent('a.json').then(aData => {
	console.log('a data', aData);
	return getFileContent(aData.next);
}).then(bData => {
	console.log('b data', bData);
	return getFileContent(bData.next);
});