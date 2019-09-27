// const mysqlConfig = () => ({
// 	host: 'localhost',
// 	user: 'root',
// 	password: 'root',
// 	port: '3306',
// 	database: 'myDB'
// });

// module.exports = mysqlConfig;

//環境參數
const env = process.env.NODE_ENV;

let MYSQL_CONF;

if(env === 'dev') {
	MYSQL_CONF = {
			host: 'localhost',
			user: 'root',
			password: 'root',
			port: '3306',
			database: 'myDB'
		};
}

if(env === 'production') {
	MYSQL_CONF = {
			host: 'localhost',
			user: 'root',
			password: 'root',
			port: '3306',
			database: 'myDB'
		};
}

module.exports = {
	MYSQL_CONF
};
