const mysql = require('mysql');

//初始化
const conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	port: '3306',
	database: 'myDB'
});

conn.connect();

//執行sql語法
const sql = 'select * from users;';
conn.query(sql, (err, result) => {
	if(err) {
		console.log("ERR", err);
		return;
	}
	console.log("RES", result);
});

//關閉連接
conn.end();