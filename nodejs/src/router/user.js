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
			if(data.name) {

				//設置session
				res.session.name = data.name;
				return new SuccessModel();
			} else {
				return new ErrorModel('login failed');
			}
		});
	}

	//登入驗證測試
	if(method === 'GET' && req.path === '/api/user/login2') {
		if(req.session.name) {
			return Promise.resolve(
				new SuccessModel()
			);
		}
		return Promise.resolve(
				new ErrorModel('login failed')
		);
	}
};

module.exports = handleUserRouter;
