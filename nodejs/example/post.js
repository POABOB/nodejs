const http = require('http');

const server = http.createServer((req, res) => {

	//POST
	if(req.method == 'POST') {
		//數據格式
		console.log('Content-type: ', req.headers['content-type']);
		//接收數據
		let postData = "";
		req.on('data', chunk =>{
			postData += chunk.toString();
		});
		req.on('end', () => {
			console.log(postData);
			res.end('Hello World!');
		});
	}
});

server.listen(8000);
console.log('Listening on port 8000');