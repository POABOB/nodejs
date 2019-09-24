const handleIndexRouter = require('./src/router/index');
const handleUserRouter = require('./src/router/user');

const serverHandler = (req, res) => {
	//設定返回格式為JSON
	res.setHeader('Content-type', 'application/json');

	const url = req.url;
	req.path = url.split('?')[0];

	//處理index路由
	const indexData = handleIndexRouter(req, res);
	if(indexData) {
		res.end(
			JSON.stringify(indexData)
		);
		return;
	}

	//處理user路由
	const userData = handleUserRouter(req, res);
	if(userData) {
		res.end(
			JSON.stringify(userData)
		);
		return;
	}

	//不符合路由，返回404
	res.writeHead(404, {"Content-type": "text/plain"});
	res.write("404 Not Found\n");
	res.end();
};

module.exports = serverHandler;