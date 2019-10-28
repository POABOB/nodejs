const http = require('http');

const server = http.createServer((req, res) => {
	//獲取完整URL
	const url = req.url;
	const path = url.split('?')[0];
	//返回路由
	res.end(path);
});

server.listen(8000);
console.log('Listening on port 8000');