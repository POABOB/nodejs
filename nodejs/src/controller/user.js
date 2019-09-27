const { exec } = require('../db/mysql');

const login = (name, password) => {
	let sql = `select name password from users where name='${name}' and password='${password}';`;

	return exec(sql).then(rows => {
		return rows[0];
	});
};

const logout = (author, keyword) => {
	//先返回假數據
	return{
			id: 1,
			title: '標題ㄎ',
			content: '內容ㄎ',
			created_at: '2019-08-32 20:00:22',
			author: 'Bob'
		};
};

module.exports = {
	login
};