const { MYSQL_CONF } = require('../config/db');
const mysql = require('mysql');

const conn = mysql.createConnection(MYSQL_CONF);

conn.connect();

function exec(sql) {
	const promise = new Promise((resolve, reject) => {
		conn.query(sql, (err, result) => {
			if(err) {
				reject(err);
				return;
			}
			resolve(result);
		});
	});

	return promise;
}
// conn.end();

module.exports = {
	exec
}