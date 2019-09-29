const auth = (req) => {
	//登入驗證
	if(!req.session.name) {
		return Promise.resolve(
			new ErrorModel('access denied')
		);
	}
};



module.exports = {
	auth
};