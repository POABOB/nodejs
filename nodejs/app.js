const querystring = require('querystring');
const handleIndexRouter = require('./src/router/index');
const handleUserRouter = require('./src/router/user');

const getPostData = (req) => {
	const promise = new Promise((resolve, reject) => {
		//如果方法不是POST，返回空
		if(req.method !== 'POST') {
			resolve({});
			return;
		}
		//如果header不是json，返回空
		if(req.headers['content-type'] !== 'application/json') {
			resolve({});
			return;
		}

		let postData = '';
		req.on('data', chunk =>{
			postData += chunk.toString();
		});

		//如果沒有POST資料，返回空
		req.on('end', () => {
			if(!postData) {
				resolve({});
				return;
			}

			resolve(
				JSON.parse(postData)
			);
		});
	});

	return promise;
};


const serverHandler = (req, res) => {
	//設定返回格式為JSON
	res.setHeader('Content-type', 'application/json');

	//獲取path
	const url = req.url;
	req.path = url.split('?')[0];

	//解析query
	req.query = querystring.parse(url.split('?')[1]);

	//處理POST data
	getPostData(req).then(postData => {
		req.body = postData;

		//處理index路由
		const indexResult = handleIndexRouter(req, res);
		if(indexResult) {
			indexResult.then(indexData => {
				res.end(
					JSON.stringify(indexData)
				);
			});
			return;
		}

		//處理user路由
		const userResult = handleUserRouter(req, res);
		if(userResult) {
			userResult.then(userData => {
				res.end(
					JSON.stringify(userData)
				);
			});
			return;
		}

		//不符合路由，返回404
		res.writeHead(404, {"Content-type": "text/plain"});
		res.write("404 Not Found\n");
		res.end();
	});

};

module.exports = serverHandler;