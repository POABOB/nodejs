const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleUserRouter = (req, res) => {
	const method = req.method;

	//POST
	//登入
	if(method === 'POST' && req.path === '/api/user/login') {
		const { name, password } = req.body;
		const result = login(name, password);
		if(result) {
			return new SuccessModel('login Succeed');
		} else {
			return new ErrorModel('login failed');
		}
	}
};

module.exports = handleUserRouter;
