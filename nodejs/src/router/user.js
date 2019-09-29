const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { get, set } = require('../db/redis');


const handleUserRouter = (req, res) => {
	const method = req.method;

	//POST
	//登入
	if(method === 'POST' && req.path === '/api/user/login') {
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
