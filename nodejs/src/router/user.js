const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleUserRouter = (req, res) => {
	const method = req.method;

	//POST
	//登入
	if(method === 'POST' && req.path === '/api/user/login') {
		const { name, password } = req.body;
		const result = login(name, password);
		return result.then(data => {
			if(data) {
				return new SuccessModel();
			} else {
				return new ErrorModel('login failed');
			}
		});
	}
};

module.exports = handleUserRouter;
