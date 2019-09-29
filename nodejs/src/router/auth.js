const { ErrorModel } = require('../model/resModel');
const auth = (req) => {
	if(!req.session.name) {
		return Promise.resolve(
			new ErrorModel('access denied')
		);
	}
};

const loginCheck = (req) => {
	if(req.session.name) {
		return Promise.resolve(
			new ErrorModel('access denied')
		);
	}
};


module.exports = {
	auth,
	loginCheck
};