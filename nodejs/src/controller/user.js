const login = (name, password) => {
	//先返回假數據
	if(name === 'BOB' && password === '123'){
		return true;
	}

	return false;
};

const logout = (author, keyword) => {
	//先返回假數據
	return [
		{
			id: 1,
			title: '標題ㄎ',
			content: '內容ㄎ',
			created_at: '2019-08-32 20:00:22',
			author: 'Bob'
		}
	];
};

module.exports = {
	login
};