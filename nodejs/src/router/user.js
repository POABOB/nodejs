const handleUserRouter = (req, res) => {
	const method = req.method;

	//POST
	//登入
	if(method === 'POST' && req.path === '/api/user/login') {
		return {
			msg: '登入'
		};
	}
};

module.exports = handleUserRouter;
