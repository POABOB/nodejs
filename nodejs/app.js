const querystring = require('querystring');
const { get, set } = require('./src/db/redis');
const handleIndexRouter = require('./src/router/index');
const handleUserRouter = require('./src/router/user');

//獲取cookie過期時間
const getCookieExpires = () => {
	const d = new Date();
	d.setTime(d.getTime() + (24 * 60 * 60 *1000));
	return d.toGMTString();
};

// //宣告SESSION資料
// const SESSION_DATA = {};

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


	/*******************************/
	//解析cookie
	req.cookie = {};
	const cookieStr = req.headers.cookie || ''; //k1=v1;k2=v3;...;
	cookieStr.split(';').forEach(item => {
		if(!item) {
			return;
		}
		const arr = item.split('=');
		const key = arr[0].trim();
		const val = arr[1].trim();
		req.cookie[key] = val;
	});


	/*******************************/
	// //解析SESSION v0.5
	// let needSetCookie = false;
	// let userId = req.cookie.userid;
	// if(userId) {
	// 	if(!SESSION_DATA[userId]) {
	// 		SESSION_DATA[userId] = {};
	// 	}
	// } else {
	// 	needSetCookie = true;
	// 	userId = `${Date.now()}_${Math.random()}`;
	// 	SESSION_DATA[userId] = {};
	// }

	//解析SESSION(redis)
	let needSetCookie = false;
	let userId = req.cookie.userid;
	if(!userId) {
		needSetCookie = true;
		userId = `${Date.now()}_${Math.random()}`;
		//初始化session(redis)
		set(userId, {});
	}

	//獲取session
	req.sessionId = userId;
	get(req.sessionId).then(sessionData => {
		if(sessionData == null) {
			//初始化session(redis)
			set(req.sessionId, {});
			//設置session
			req.session = {};
		} else {
			req.session = sessionData;
		}

		//return promise之後處理post data
		return getPostData(req);
	})
	.then(postData => {
		req.body = postData;

		//Router註冊
		/*******************************/
		//處理index路由
		const indexResult = handleIndexRouter(req, res);
		if(indexResult) {
			indexResult.then(indexData => {
				if(needSetCookie) {
					res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
				}
				res.end(
					JSON.stringify(indexData)
				);
			});
			return;
		}


		/*******************************/
		//處理user路由
		const userResult = handleUserRouter(req, res);
		if(userResult) {
			userResult.then(userData => {
				if(needSetCookie) {
					res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
				}
				res.end(
					JSON.stringify(userData)
				);
			});
			return;
		}



		/*******************************/
		//不符合路由，返回404
		res.writeHead(404, {"Content-type": "text/plain"});
		res.write("404 Not Found\n");
		res.end();
	});

};

module.exports = serverHandler;