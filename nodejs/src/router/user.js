const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { set, del } = require('../db/redis');
//登入驗證的function
const { auth, loginCheck } = require('./auth');

const handleUserRouter = (req, res) => {
	const method = req.method;

	//GET
	//登入狀態不給進頁面
	if(method === 'GET' && req.path === '/api/user/loginCheck') {
		//判斷是否登入
		const auth = loginCheck(req);
		if(auth) {
			//已登入
			return auth;
		}
		return Promise.resolve(
			new SuccessModel()
		);
	}

	//登出
	if(method === 'GET' && req.path === '/api/user/logout') {
		//判斷是否登入
		const loginCheck = auth(req);
		if(loginCheck) {
			//未登入
			return loginCheck;
		}
		//登入就登出ㄅ
		// return exec(sql).then(rows => {
		// 	return rows[0] || {};
		// });
		return del(req.sessionId).then(res => {
			// console.log(res);
			if(res) {
				req.session = {};
				return new SuccessModel('already logout');
			}
			return new ErrorModel('logout failed');
		});

	}

	//POST
	//登入
	if(method === 'POST' && req.path === '/api/user/login') {
		//判斷是否登入
		const auth = loginCheck(req);
		if(auth) {
			//已登入
			return auth;
		}

		const { name, password } = req.body;
		const result = login(name, password);
		return result.then(data => {
			if(data.name) {

				//設置session
				req.session.name = data.name;

				//同步redis
				set(req.sessionId, req.session);

				return new SuccessModel();
			} else {
				return new ErrorModel('login failed');
			}
		});
	}

};

module.exports = handleUserRouter;
