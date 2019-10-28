const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
	//獲取完整URL
	const method = req.method;
	const url = req.url;
	const path = url.split('?')[0];
	const query = querystring.parse(url.split('?')[1]);

	//設定返回格式為JSON
	res.setHeader('Content-type', 'application/json');
	const resData = {
		method,
		url,
		path,
		query
	};

	//POST
	if(method === 'GET') {
		res.end(JSON.stringify(resData));
	}

	if(method === 'POST') {
		//接收數據
		let postData = "";
		req.on('data', chunk => {
			postData += chunk.toString();
		});
		req.on('end', () => {
			resData.postData = postData;
			res.end(JSON.stringify(resData));
		});
	}
});

server.listen(8000);
console.log('Listening on port 8000');