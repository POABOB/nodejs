const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
	//GET
	console.log('Method: ', req.method);
	//獲取完整URL
	const url = req.url;
	console.log('Url: ', url);
	//解析querystring
	req.query = querystring.parse(url.split('?')[1]);
	console.log('Query: ', req.query);
	//querystring返回
	res.end(JSON.stringify(req.query));

});

server.listen(8000);
console.log('Listening on port 8000');